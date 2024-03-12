const express=require("express");
const app=express();
const path=require('path')
const bp=require('body-parser')
const mongoose=require('mongoose');
const { MongoAPIError } = require("mongodb");

//using body parser
app.use(bp.urlencoded({extended:true}));

//connecting to database
mongoose.connect('mongodb://127.0.0.1:27017/Attendace',{useNewUrlParser:true});
let con=mongoose.connection;

//testing connection
con.on('error',console.log.bind(console,"Error generated here"));
con.once('open',()=>{console.log("Hurrah! connection established")});

//creating schema
let studSchema=new mongoose.Schema({
    uname:String,
    regno:Number,
    rollno:Number
})

//assigning value to variable
let info=mongoose.model('info',studSchema);

app.listen(3000,(e)=>{
    if (!e) {
        console.log("Server started!");
    } else {
        console.log("Error generated ");
    }
});

app.get('/tt', (req, res) => {
    res.sendFile(path.join(__dirname,"attendanceform.htm"));
    const params={ };
});

app.post('/tt', (req, res) => {
  const data = new info(req.body);
  data.save().then(()=>{
    res.sendFile(path.join(__dirname,"savedanimation.htm"));
  }).catch((error)=>{
    res.status(400).sendFile(path.join(__dirname,"errorhappened.htm"))
  })
});

