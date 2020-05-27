const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const cartRouter = express.Router();

//! prepare data for implement logic
const data_path = path.join(__dirname, '../data/data.json');
const rawdata = fs.readFileSync(data_path);
let parsedData = JSON.parse(rawdata);
let carts = parsedData.orders;

//! apply middleware
cartRouter.use(bodyParser.json());

//! define routes
cartRouter.route('/').get((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json(carts);
});

cartRouter
  .route('/:productId')
  .post((req, res, next) => {
    const productId = parseInt(req.params.productId);
    if (productId !== null) {
      if (carts.some((order) => order.productId === productId)) {
        //! update the quantity
        const index = carts.map((order) => order.productId).indexOf(productId);
        carts[index].quantity += 1;
        fs.writeFileSync(data_path, JSON.stringify(parsedData, null, 4));
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(carts);
      } else {
        //! create new order and push it to the orders array
        carts.push({ productId: productId, quantity: 1 });
        fs.writeFileSync(data_path, JSON.stringify(parsedData, null, 4));
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(carts);
      }
    } else {
      err = new Error('Body didnot contain product information');
      err.status = 404;
      return next(err);
    }
  })

  .get((req, res, next) => {
    const productId = parseInt(req.params.productId);
    if (productId !== null) {
      if (carts.some((order) => order.productId === productId)) {
        //! update the quantity
        const index = carts.map((order) => order.productId).indexOf(productId);
        carts[index].quantity -= 1;
        if (carts[index].quantity <= 0 && index > -1) {
          carts.splice(index, 1);
        }
        fs.writeFileSync(data_path, JSON.stringify(parsedData, null, 4));
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(carts);
      } else {
        err = new Error('This product isnot contain at cart');
        err.status = 404;
        return next(err);
      }
    } else {
      err = new Error('Couldnot find product with this id');
      err.status = 404;
      return next(err);
    }
  })

  .delete((req, res, next) => {
    const productId = parseInt(req.params.productId);
    if (productId !== null) {
      if (carts.some((order) => order.productId === productId)) {
        //! remove the order
        const index = carts.map((order) => order.productId).indexOf(productId);

        carts.splice(index, 1);

        fs.writeFileSync(data_path, JSON.stringify(parsedData, null, 4));
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(carts);
      } else {
        err = new Error('This product isnot contain at cart');
        err.status = 404;
        return next(err);
      }
    } else {
      err = new Error('Couldnot find product with this id');
      err.status = 404;
      return next(err);
    }
  });

module.exports = cartRouter;
