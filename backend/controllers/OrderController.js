const formidable = require('formidable');
const pool = require('../models/database');
const { orderValidator } = require('../utils/index');
const { v4: uuidv4 } = require('uuid');


exports.placeOrder = (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields) => {
      const { user_id, product_id, quantity, order_address} = fields;
      // check for all fields
      if (orderValidator(fields)) {
        return res.status(400).json(orderValidator(fields));
      }
      try {
        const newID = uuidv4();
        const status = "received";
        const shipDate = "error";
        const complete = false;

        const newOrder = await pool.query(
          'INSERT INTO orders (id, user_id, product_id, product_quantity, order_address, status, complete) VALUES ($1, $2, $3, $4, $5, $6, $7)',
          [newID,user_id, product_id, quantity, order_address,status,complete]
        );
        return res.status(201).send(`User added: ${newOrder.rowCount}`);
      } catch (error) {
        return res.status(400).json({
          error,
        });
      }
    });
  };

exports.getAllOrders = async (req, res, next) => {
  try {
      const order = await pool.query(
      'SELECT * FROM orders'
      );
      req.order = order.rows;
      return next();
} catch (err) {
    return res.status(400).json({
    error: err,
    });
}
};

exports.getOrderById = async (req, res, next) => {
const id = req.params.id;
try {
    const order = await pool.query(
    'SELECT * FROM orders WHERE id = $1',
    [id]
    );
    req.order = order.rows;
    return next();
} catch (err) {
    return res.status(400).json({
    error: err,
    });
}
};


exports.deleteOrder = async (req, res) => {
    const id = req.params.id;
    try {
      await pool.query('DELETE FROM orders WHERE id = $1', [id]);
      return res.status(200).send(`Order deleted with ID: ${id}`);
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  };
  
exports.read = (req, res) => res.json(req.order);