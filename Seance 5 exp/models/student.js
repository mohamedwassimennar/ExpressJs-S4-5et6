const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Student = new Schema({
    FullName: String,
    Grade: Number,
});

module.exports= mongoose.model("students", Student);