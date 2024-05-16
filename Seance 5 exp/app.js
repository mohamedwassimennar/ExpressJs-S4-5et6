const express = require("express");
const logger = require('morgan');
const createError=require('http-errors');

const mongoose = require("mongoose");
const mongoConfig=require("./database/dbConfig.json") 


const studentsRouter = require("./routes/student");
const app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//routers

app.use("/students",studentsRouter);


app.use((req,res,next)=>{
    next(createError(404));
});

//mongoose
mongoose.connect(mongoConfig.mongo.uri);

module.exports = app;