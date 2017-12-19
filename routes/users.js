var express = require('express')
var router = express.Router()
var db = require('../db/api')
var bcrypt = require('bcrypt')

router.post('/signin', function(req, res, next){
  db.signIn(req.body)
  .then(function(agent){
    bcrypt.compare(req.body.password, agent[0].password, function(err, isMatch){
      if (isMatch) {
        //Route to /Assignment
        console.log("It's a Match!");
      }
      else {
        console.log("Not a Match...");
        res.render('index', { title: 'gClassified', message: 'Incorrect login. Contents will self destruct' })
      }
    })
  })
})

router.post('/signup', function(req,res,next){
  console.log("This is the password: " + req.body.password);

  //Use bcrypt to Sign Up
  bcrypt.hash(req.body.password, 10, function(err, hash){

    db.signUp(req.body, hash)
    .then(function(agent){
      console.log("This is the encrypted password: " + agent[0].password);
      if (agent[0].password === req.body.password) {
        res.render('index', { title: 'gClassified', message: 'Password Must Be Hashed. Government Secrets are at Stake!' })
      }
      else {
        res.render('index', { title: 'gClassified', message: 'Sign Up Successful' })
      }
    })
  })
})

module.exports = router
