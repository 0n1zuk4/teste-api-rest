const User = require('../models/user');
const express = require('express');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const router = express.Router();

function generateToken(params = {}){
  return jwt.sign({id: User.id}, authConfig.secret , {expiresIn: 86400});
}

function verifyJWT(req, res, next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(!token) return res.status(401).send({ error: 'No token provide'});

  jwt.verify(token, authConfig.secret, function(err, decoded){
    if(err) return res.status(500).status({error: 'Failed to authenticate token'});

    req.userId = decoded.id;
    next();
  });
}

//Create a new Product
router.post('/register', (req, res) => {
  if(!req.body)
    return res.status(400).send({error: 'Product content not be empty'});
//create a new user
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
});

//Save user in the database
   user.save();
   res.send({user, token: generateToken({id: user.id})})
});

//Retrieve all users
router.get('/user', verifyJWT, (req, res) =>{
  User.find()
    .then(users => {
      res.send(users);
    }).catch(err => {
      res.status(500).send({error: 'Something wrong while retrieving users'});
    });
});

//Retrive a single user with userId
router.get('/user/:userId',  (req, res)=>{
  User.findById(req.params.userId)
  .then(users => {
    if(!users)
      return res.status(404).send({error: 'User not found with id ' + req.params.userId});

    res.send(users);
  }).catch(err => {
    if(err.kind === 'ObjectId')
      return res.status(404).send({error: 'user not found with id '  + req.params.userId});

    res.status(500).send({error: 'Something wrong while retrieving user with id ' + req.params.userId});
  });
});

//Update a note with productId
router.put('/user/:userId', (req,res)=>{
  User.findByIdAndUpdate(req.params.userId, {
    firstName: req.body.firstName ,
    lastName: req.body.lastName,
    email: req.body.email,
    password:req.body.password
  }, {new: true})
    .then(users =>{
      if(!users)
        return res.status(404).send({error: 'user not found with id ' + req.params.userId});

      res.send(users);
    }).catch(err => {
      if(err.kind === 'ObjectId')
        return res.status(404).send({error: 'user not found with id ' + req.params.userId});

      return res.status(500).send({error: 'Something wrong update note with id ' + req.params.userId});
    });

});

///Delete a note with productId
router.delete('/user/:userId',(req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .then(users => {
      if(!users)
        return res.status(404).send({error: 'user not found with id ' + req.params.userId});

      res.send({message: 'user deleted successfully'});
    }).catch(err => {
      if(err.kind === 'ObjectId')
        return res.status(404).send({error: 'user not found with id ' + req.params.userId});

      res.status(404).send({error: 'Something wrong delete user with id ' + req.params.userId});
    });
});




module.exports = app => app.use('/rh', router);
