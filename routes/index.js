var express = require('express');
var router = express.Router();
var expressSession = require('express-session');
var mongoose = require('mongoose');
var path = require('path');
var Character = mongoose.model('User');

var users = require('../controllers/users_controller');
console.log("before / Route");
router.get('/', function(req, res){
    console.log("/ Route");
//    console.log(req);
    console.log(req.session);
    if (req.session.user) {
      console.log("/ Route if user");
      res.render('index', {username: req.session.username,
                           logged:req.session.loggedin,
                           msg:req.session.msg,
                           color:req.session.color});
    } else {
      console.log("/ Route else user");
      res.render('index', {username: null, logged:"false",msg: null, color: null});
      //req.session.msg = 'Access denied!';
      //res.redirect('/login');
    }
});
router.get('/user', function(req, res){
    console.log("/user Route");
    if (req.session.user) {
      res.render('user', {msg:req.session.msg});
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
});
router.get('/signup', function(req, res){
    console.log("/signup Route");
    if(req.session.user){
      req.session.loggedin = "true";
      res.redirect('/');
    }
    res.render('signup', {msg:req.session.msg});
});
router.get('/login',  function(req, res){
    console.log("/login Route");
    if(req.session.user){
      res.redirect('/');
    }
    res.render('login', {msg:req.session.msg});
});
router.get('/logout', function(req, res){
    console.log("/logout Route");
    req.session.destroy(function(){
      res.redirect('/');
    });
  });
router.get('/pickCharacter', function(req, res, next) {
  res.sendFile(path.resolve('views/characters.html'));
});
router.get('/characters', function(req, res, next) {
  Character.find(function(err, characters){
    if(err){ return next(err); }
    res.json(characters);
  });
});
router.delete('/characters', function (req, res) {
    Character.find().remove(function (err, user) {
        if (err) return res.send(err);
        res.json({ message: 'Deleted' });
    });
});
router.get('/character', function(req, res, next) {
  res.sendFile(path.resolve('views/character.html'));
})

router.get('/getcharacter', function(req, res, next) {
  Character.find( { username: req.param('name') }, function(err, character){
    if(err){ return next(err); }
    console.log(character);
    res.json(character);
  });
});
router.post('/signup', users.signup);
router.post('/user/update', users.updateUser);
router.post('/user/delete', users.deleteUser);
router.post('/login', users.login);
router.get('/user/profile', users.getUserProfile);


module.exports = router;