const Product = require('../models/products');

// Create a product
exports.create = (req, res) => {
  if(!req.body)
    return res.status(400).send({error: 'Product content not be empty'});


//create a new product
const product = new Product({
  title: req.body.title,
  description: req.body.description,
  price: req.body.price,
  company: req.body.company
});

//Save Product in the database

product.save()
  .then(data =>{
    res.send(data);
  }).catch(err => {
    res.status(500).send({error: 'Something wrong while creating the product'});
  });

};

//Retrieve all products from the database

exports.findAll = (req, res) => {
  Product.find()
    .then(products => {
      res.send(products);
    }).catch(err => {
      res.status(500).send({error: 'Something wrong while retrieving products'});
    });
};

//Find a single products with productId

exports.findOne = (req, res) => {
  Product.findById(req.params.productId)
  .then(product => {
    if(!product)
      return res.status(404).send({error: 'Product not found with id ' + req.params.productId});

    res.send(product);
  }).catch(err => {
    if(err.kind === 'ObjectId')
      return res.status(404).send({error: 'Product not found with id '  + req.params.productId});

    res.status(500).send({error: 'Something wrong while retrieving products with id ' + req.params.productId});
  });
};

//Update a product
exports.update = (req, res) => {
  // validate product
  if(!req.body)
    return res.status(400).send({error: 'Product content can not be empty'});

  // find and update product whith the request body

  Product.findByIdAndUpdate(req.params.productId, {
    title: req.body.title || "No product title",
    description: req.body.description,
    price: req.body.price,
    company:req.body.company
  }, {new: true})
    .then(product =>{
      if(!product)
        return res.status(404).send({error: 'Product not found with id ' + req.params.productId});

      res.send(product);
    }).catch(err => {
      if(err.kind === 'ObjectId')
        return res.status(404).send({error: 'Product not found with id ' + req.params.productId});

      return res.status(500).send({error: 'Something wrong update note with id ' + req.params.productId});
    });
};

// Delete a note with the specified nodeId in the request
exports.delete = (req, res) => {
  Product.findByIdAndRemove(req.params.productId)
    .then(product => {
      if(!product)
        return res.status(404).send({error: 'Product not found with id ' + req.params.productId});

      res.send({message: 'Product deleted successfully'});
    }).catch(err => {
      if(err.kind === 'ObjectId')
        return res.status(404).send({error: 'Product not found with id ' + req.params.productId});

      res.status(404).send({error: 'Something wrong delete product with id ' + req.params.productId});
    });
};
