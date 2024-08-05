var express = require('express')
var app = express()
var fs = require('fs')

var bodyParser = require('body-parser')

var cookieParser = require('cookie-parser')

var multer = require('multer')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

app.use(bodyParser.json())


//var uploads = multer({dest:__dirname+"/uploads"})

var storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,__dirname+"/uploads")

    },
    filename : function(req,file,cb){
        //console.log(file)
        cb(null,file.originalname)
    }
})

var uploads = multer({storage:storage}) 

app.post("/uploadfile",uploads.single('ufile'),function(req,res){
  // console.log(req.body)
  console.log(req.file)
   res.cookie('username',req.body.username)
  // console.log(req.cookies.username)

   fs.rename(__dirname+"/uploads/"+req.file.fieldname,__dirname+"/uploads/"+req.cookies.username+"/"+req.file.originalname,function(err,b,c){
  //  console.log(a,b,c)
    if(err){
        res.send("invalid username")
    }
    else{
        res.send("file uploaded success")
    }
   })
    res.send("please wait")
})


app.listen(3800,function(){console.log("server is running on 3800")})