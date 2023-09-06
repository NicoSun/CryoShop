// require express and it's router component
const express = require('express');
const router = express.Router();

// require the middlewares and callback functions from the controller directory
const {
  createUser,
  deleteUser,
  getUserByName,
  getAllUsers,
  updateUser,
  loginUser,
  logoutUser,
  userProfile,
  read,
} = require('../controllers/UserController');

// Create POST route to create an User
router.post('/create', createUser);
// Create GET route to read an User
router.get('/info/:name', getUserByName, read);
// Create PUT route to update an User
router.put('/update', updateUser);
// Create DELETE route to remove a User
router.delete('/get/:id', deleteUser);
// Create GET route to read a list oll Users
router.get('/allUsers', getAllUsers,read);

router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/userprofile', userProfile);

router.get('/cart');
router.get('/checkout');

module.exports = router;