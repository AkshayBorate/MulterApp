var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var multer = require("multer")

var db = require("./database/db.js");

db();
console.log("database Connectd");

var Schema = mongoose.Schema;

var imageSchema = new Schema({
    image:{
        data:Buffer,
        contentType:String,
    },
})

var ImageModel = mongoose.model("image",imageSchema,"image");

var app = express();
app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

app.get("/getimage", async (req, res) => {
    try {
      var result = await ImageModel.find();
      const images = result.map(item => ({
        ...item.toObject(),
        image: {
          ...item.image,
          data: item.image.data.toString('base64') 
        }
      }));
      res.json(images);
    } catch (err) {
      res.send(err.message);
    }
  });
  

app.post("/upload",upload.single("image"),async(req,res)=>{
    try{
    const newImage = new ImageModel({
        image: {
            data: req.file.buffer,
            contentType: req.file.mimetype,
        },
        
    })
    await newImage.save();
    res.send("Image saved sussfully")
    }
    catch(err){
        res.send(err.message)
    }
})

app.listen(9000)
