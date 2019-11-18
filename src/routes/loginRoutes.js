var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var express = require('express');
const authConfig = require('../config/auth');

var router = express.Router();

function verifyJWT(req, res, next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(!token) return res.status(401).send({ error: 'No token provide'});

  jwt.verify(token, authConfig.secret, function(err, decoded){
    if(err) return res.status(500).status({error: 'Failed to authenticate token'});

    req.userId = decoded.id;
    next();
  });
}

router.get('/', verifyJWT,function(req,res){
  res.send('login');
});

router.post('/login', (req,res) =>{
  if (req.body.email != "onizuka" || req.body.password != "123") {
        res.json({ success: false, message: 'Usuário ou senha incorreto(s)!' });
} else {
          console.log("auth ok");
        };
const id = 101
var token = jwt.sign({id}, authConfig.secret, {
            expiresIn: 1440
        });

        res.json({
            success: true,
            message: 'Token criado!!!',
            toke: token
        });

});
module.exports = app => app.use('/auth', router);
