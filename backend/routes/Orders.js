// require express and it's router component
const express = require('express');

const router = express.Router();

// require the middlewares and callback functions from the controller directory
const {
  deleteOrder,
  getOrderById,
  getAllOrders,
  placeOrder,
  read,
} = require('../controllers/OrderController');

// Create POST route to create an Order
router.post('/place', placeOrder);
// Create GET route to read a list of all Orderss
router.get('/allorders', getAllOrders,read);
// Create DELETE route to remove an Order
router.delete('/get/:id', deleteOrder);
// Create GET route to read an Order
router.get('/get/:id', getOrderById,read);

module.exports = router;
