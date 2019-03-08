var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Book = require('../models/Book.js');
var User = require('../models/User.js');
const passport = require('passport');
const jwt = require('jsonwebtoken');

var multer = require('multer');
var path = require('path');
var userName = "";


var store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './uploads');
    },
    filename:function(req,file,cb){
        cb(null, file.originalname);
    }
});


var upload = multer({storage:store}).single('file');

router.post('/upload/', function(req,res,next){
    upload(req,res,function(err){
        if(err){
            return res.status(501).json({error:err});
        }
        //do all database record saving activity
        return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
    });
});


router.post('/download', function(req,res,next){
    filepath = path.join(__dirname,'../uploads') +'/'+ req.body.filename;
    res.sendFile(filepath);
});

/* GET ALL BOOKS */
router.get('/', function(req, res, next) {
  Book.find(function (err, products) {
    console.log("Error is:"+err);
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE BOOK BY ID */
router.get('/:id', function(req, res, next) {
  Book.findById(req.params.id, function (err, post) {
    console.log(__dirname);
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE BOOK */
router.post('/', function(req, res, next) {
  // var p  = path.join(__dirname,'../uploads/');
  // req.body.img = path.join(p,req.body.img);
  req.body.img = req.protocol +'://' + req.get("host")+"/uploads/"+req.body.img;
  Book.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE BOOK */
router.put('/:id', function(req, res, next) {
  Book.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


/* DELETE BOOK */
router.delete('/:id', function(req, res, next) {
  Book.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json({
     succes: true,
     userName: this.userName,
     data:{
       msg: post    
     } 
    });
  });
});

// post user

router.post('/user',function(req,res,next){
  console.log('came here ');
  User.create(req.body, function (err, post) {
    console.log("inside create");
    if (err) return next(err);
    res.json(post);
  });
});

// Authenticate
router.post('/authenticate', function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }
     if(password === user.password){
       this.userName = username;
       return res.json({
          success: true,
          data:{
            msg:"Password Valid",
            userName: username
          }
       });
     }
     else{
       return res.json({
        success : false,
        data:"Password Invalid"
       });
     }

    // User.comparePassword(password, user.password, (err, isMatch) => {
    //   if(err) throw err;
    //   console.log("pass"+password);
    //   console.log("user.pass"+user.password);
    //   console.log("Match"+isMatch);
    //   if(isMatch){

    //     res.json({
    //       success: true,
    //       token: 'JWT '+token,
    //       user: {
    //         id: user._id,
    //         name: user.name,
    //         username: user.username,
    //         email: user.email
    //       }
    //     });
    //   } else {
    //     return res.json({success: false, msg: 'Wrong password'});
    //   }
    // });
  });
});
module.exports = router;