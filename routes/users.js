const express = require('express');
const mongoose = require('mongoose');
var User = require('../models/user');
var passport = require('passport');
const  authenticate = require('../authenticate');
const Users = require('../models/user');
const cors = require('./cors');

var router = express.Router();
//router.use(bodyParser.json());
router.use(express.json());

/* GET users listing. */
router.get('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res) => {
  Users.find({})
  .then((users) => {
    res.statusCode = 200;
        res.setHeader('Content-Type','aplicattion/json');
        res.json(users);
  }, (err) => next(err))
  .catch((err) => next(err));
})

router.post('/singup', cors.corsWithOptions, (req,res,next) => {
  //User.findOne({username: req.body.username})
  console.log(req.body);
  User.register(new User({username: req.body.username}), 
    req.body.password, (err,user) => {
      console.log(req);
      if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'aplication/json');
      res.json({err: err});
    }
    else {
      //aca se registra el usuario si no hubo error
      if (req.body.firstname)
        user.firstname = req.body.firstname;
      if (req.body.lastname)
        user.lastname = req.body.lastname;
      user.save((err, user) => {
        if (err){
          res.statusCode = 500;
          res.setHeader('Content-Type', 'aplication/json');
          res.json({err: err});
        }
        passport.authenticate('local')(req,res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'aplication/json');
          res.json({success: true, status: 'Registration Succesful!'})
        } );
      });      
    }
  })
})

router.post('/login', cors.corsWithOptions, passport.authenticate('local'), (req,res) => {
  
  var token = authenticate.getToken({_id: req.user._id}) // este req.user es agregado en la validacion `passport.authenticate('local')`
  res.statusCode = 200;
  res.setHeader('Content-Type', 'aplication/json');
  res.json({success: true, token: token, status: 'You are Succesfully logged!'})
})

router.get('/logout', cors.corsWithOptions, (req,res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
})


module.exports = router;
