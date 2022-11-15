var express = require('express');
var router = express.Router();
var fs = require('fs')
const url = require('url')

var db = 'mongodb+srv://admin:ntcz3NtuBmDGzQQq@cluster0.bbvmc.mongodb.net/asmnet?retryWrites=true&w=majority'
const mongoose = require('mongoose');
const e = require("express");
mongoose.connect(db).catch(error =>{
  console.log("Có lỗi xảy ra")
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
const truyenSchema = new mongoose.Schema({
  name: 'string',
  chart: 'string',
  avatar: 'string',
  Category: 'string'

});
const commentSchema = new mongoose.Schema({
  noidung: 'string',
  time: 'string'
});
const userSchema = new mongoose.Schema({
  username: 'string',
  password: 'string',
  email: 'string',
  fullname: 'string'

});
const Truyen = mongoose.model('truyens',truyenSchema);
router.post('/uploads', function (req,res) {
  var name = req.body.name;
  var chart = req.body.chart;
  var avatar = req.body.avatar;
  var Category = req.body.Category;
  console.log(name);
  console.log(chart);
  console.log(avatar);
  console.log(Category);

  const data = new Truyen({
    name: name,
    chart: chart,
    avatar: avatar,
    Category: Category
  });

  data.save(function (err) {
    if (err) return handleError(err);
    res.render('index', {
      title: 'Thêm',
      message: 'Đã thêm'
    })
    console.log('Da them')
  });
});
router.get('/gettruyen',function (req,res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  Truyen.find({}, function (err,data){
    res.send(data);
  })

});
router.get('/getComments', function (req, res) {

  const CommentList = mongoose.model('comments', commentSchema);

  CommentList.find({}, function (error, result) {
    res.send(result);
  })
});
router.get('/getuser', function (req, res) {
  const userList = mongoose.model('users', userSchema);
  userList.find({}, function (error, result) {
    res.send(result);
  })
});
const User = mongoose.model('users',userSchema);
router.post('/useruploads', function (req,res) {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  var fullname = req.body.fullname;
  console.log(username);
  console.log(password);
  console.log(email);
  console.log(fullname);

  const data = new User({
    username: username,
    password: password,
    email: email,
    fullname: fullname
  });

  data.save(function (err) {
    if (err) return handleError(err);
    res.render('index', {
      title: 'Thêm',
      message: 'Đã thêm'
    });
    res.redirect('/getuser')
    console.log('Da them')
  });
});
module.exports = router;
