const express = require('express');
const bodyParser = require("body-parser");
const app = express ();
app.use(bodyParser.json());
const path = require('path');

const db = require("./db");

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });


const collection = "todo";



db.connect((err)=>{
    if(err){
        console.log('unable to connect');
        process.exit(1);
    }
else{
    app.listen(3000,()=>{
        console.log('connected succesfully, app listening on port 3000');
    });
    }

})

