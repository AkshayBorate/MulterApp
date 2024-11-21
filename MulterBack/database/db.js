var mongoose = require("mongoose")

function dbconnect(){
    var connection = mongoose.connect("mongodb://127.0.0.1:27017/RegisterData");
    return connection;
}
module.exports = dbconnect;