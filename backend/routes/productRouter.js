const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const productRouter = express.Router();

//! prepare data for implement logic
const data_path = path.join(__dirname, '../data/data.json');
const rawdata = fs.readFileSync(data_path);
let parsedData = JSON.parse(rawdata);
let Products = parsedData.products;

//! apply middleware
productRouter.use(bodyParser.json());

//! define routes
productRouter
  .route('/')
  .get((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(Products);
  })
  .post((req, res, next) => {
    if (req.body !== null) {
      if (Products.some((product) => product.id === req.body.id)) {
        //! this product already exits in our array

        err = new Error('Product with id:' + req.body.id + ' already exit');
        err.status = 404;
        return next(err);
      } else {
        //! push new product to our array

        Products.push(req.body);
        fs.writeFileSync(data_path, JSON.stringify(parsedData, null, 4));
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Products);
      }
    } else {
      err = new Error('Body didnot contain product information');
      err.status = 404;
      return next(err);
    }
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /products');
  })

  //! beware to use this route. It will permanently delete all the products

  .delete((req, res, next) => {
    Products.splice(0, Products.length);
    fs.writeFileSync(data_path, JSON.stringify(parsedData, null, 4));
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(Products);
  });

productRouter
  .route('/:id')

  .get((req, res, next) => {
    const id = parseInt(req.params.id);
    if (id !== null) {
      if (Products.some((product) => product.id === id)) {
        const index = Products.map((product) => product.id).indexOf(id);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Products[index]);
      } else {
        err = new Error('This product isnot exit');
        err.status = 404;
        return next(err);
      }
    } else {
      err = new Error('Couldnot find product with this id');
      err.status = 404;
      return next(err);
    }
  })

  .post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /products ' + req.params.id);
  })

  .delete((req, res, next) => {
    const id = parseInt(req.params.id);
    if (id !== null) {
      if (Products.some((product) => product.id === id)) {
        //! remove the specific product

        const index = Products.map((product) => product.id).indexOf(id);

        Products.splice(index, 1);

        fs.writeFileSync(data_path, JSON.stringify(parsedData, null, 4));
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Products);
      } else {
        err = new Error('This product isnot exit');
        err.status = 404;
        return next(err);
      }
    } else {
      err = new Error('Couldnot find product with this id');
      err.status = 404;
      return next(err);
    }
  });

module.exports = productRouter;
