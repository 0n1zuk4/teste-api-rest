  const products = require('../controller/productController.js');
  const express = require('express');

  const router = express.Router();


  //Create a new Product
  router.post('/products', products.create);

  //Retrieve all Products
  router.get('/products', products.findAll);

  //Retrive a single Product with productId
  router.get('/products/:productId', products.findOne);

  //Update a note with productId
  router.put('/products/:productId', products.update);

  //Delete a note with productId
  router.delete('/products/:productId', products.delete);

module.exports = app => app.use('/storage', router);
