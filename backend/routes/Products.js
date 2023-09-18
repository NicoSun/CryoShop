// require express and it's router component
const express = require('express');

const router = express.Router();

// require the middlewares and callback functions from the controller directory
const {
  addProduct,
  deleteProduct,
  getproductById,
  getAllProducts,
  getproductByCategory,
  getCategories,
  updateProduct,
  read,
} = require('../controllers/ProductController');

// Create POST route to create an Product
router.post('/add', addProduct);
// Create GET route to read an Product
router.get('/get/:id', getproductById, read);
// Create PUT route to update an Product
router.put('/get/:id', updateProduct);
// Create DELETE route to remove a Product
router.delete('/get/:id', deleteProduct);
// Create GET route to read a list oll products
router.get('/allproducts', getAllProducts,read);
// Create GET route to read a list oll categories
router.get('/categories', getCategories,read);
// Create GET route to read a list oll categories
router.get('/categories/:name', getproductByCategory,read);

module.exports = router;