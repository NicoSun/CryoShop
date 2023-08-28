const formidable = require('formidable');
const pool = require('../models/database');
const { ProductValidator } = require('../utils/index');
const { v4: uuidv4 } = require('uuid');


exports.addProduct = (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields) => {
      const { product_name, product_desc, product_imag, product_price,category} = fields;
      // check for all fields
      if (ProductValidator(fields)) {
        return res.status(400).json(ProductValidator(fields));
      }
      try {
        const newID = uuidv4();
        const newProduct = await pool.query(
          'INSERT INTO products (id, product_name, product_desc, product_imag, product_price, category) VALUES ($1, $2, $3, $4, $5, $6)',
          [newID,product_name, product_desc, product_imag, product_price, category]
        );
        return res.status(201).send(`Product added: ${newProduct.rowCount}`);
      } catch (error) {
        return res.status(400).json({
          error,
        });
      }
    });
  };

exports.getproductById = async (req, res, next) => {
  const id = req.params.id;
  try {
      const product = await pool.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
      );
      req.product = product.rows;
      return next();
  } catch (err) {
      return res.status(400).json({
      error: err,
      });
  }
  };

exports.getAllProducts = async (req, res, next) => {
  try {
      const product = await pool.query(
      'SELECT * FROM products'
      );
      req.product = product.rows;
      return next();
} catch (err) {
    return res.status(400).json({
    error: err,
    });
}
};

exports.getCategories = async (req, res, next) => {
  try {
      const category = await pool.query(
      'SELECT DISTINCT category FROM products'
      );
      req.product = category.rows;
      return next();
} catch (err) {
    return res.status(400).json({
    error: err,
    });
}
};


exports.getproductByCategory = async (req, res, next) => {
const id = req.params.id;
try {
    const product = await pool.query(
    'SELECT * FROM products WHERE category = $1',
    [id]
    );
    req.product = product.rows;
    return next();
} catch (err) {
    return res.status(400).json({
    error: err,
    });
}
};




exports.updateProduct = async (req, res, next) => {
  const id = req.params.id;
  const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields) => {
      const {product_name, product_desc, product_imag, product_price} = fields;
      // check for all fields
      if (ProductValidator(fields)) {
        return res.status(400).json(ProductValidator(fields));
      }
      try {
        const newProduct = await pool.query(
          'UPDATE products SET product_name = $1, product_desc = $2, product_imag = $3, product_price = $4 WHERE id = $5',
          [product_name, product_desc, product_imag, product_price,id]
        );
        return res.status(201).send(`Product updated: ${newProduct.rowCount}`);
      } catch (error) {
        return res.status(400).json({
          error,
        });
      }
    });
  };


exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
      await pool.query('DELETE FROM products WHERE id = $1', [id]);
      return res.status(200).send(`product deleted with ID: ${id}`);
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  };
  
exports.read = (req, res) => res.json(req.product);