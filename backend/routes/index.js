var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({
    '/products': 'Give all products',
    '/products/:id': 'Give all information to a specific product',
    '/orders': 'Give all the orders information',
    '/orders/:productId': 'Give all information to a specific order',
  });
});

module.exports = router;
