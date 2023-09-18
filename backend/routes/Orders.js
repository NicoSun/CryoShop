// require express and it's router component
const express = require('express');

const router = express.Router();

// require the middlewares and callback functions from the controller directory
const {
  deleteOrder,
  getOrderById,
  getAllOrders,
  getOrderByUserID,
  placeOrder,
  read,
} = require('../controllers/OrderController');

// Create POST route to create an Order
router.post('/place', placeOrder);
// Create GET route to read a list of all Orderss
router.get('/allorders', getAllOrders,read);

router.get('/user/:id', getOrderByUserID,read);
// Create DELETE route to remove an Order
router.delete('/:id', deleteOrder);
// Create GET route to read an Order
router.get('/:id', getOrderById,read);

module.exports = router;
