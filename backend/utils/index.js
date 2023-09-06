const validator = require("express-validator");

exports.orderValidator = (fields) => {
    const {  user_id, product_id, product_quantity, product_price, order_address } = fields;
    if (!user_id || !product_id || !product_quantity || !order_address || !product_price) {
      const emptyFields = [];
      Object.keys(fields).forEach((field) => {
        if (fields[field].length <= 0) {
          emptyFields.push(field);
        }
      });
      return {
        error: 'All Order fields are required',
        emptyFields,
      };
    }
    return null;
  };

exports.ProductValidator = (fields) => {
  const { product_name, product_desc, product_imag, product_price, category } = fields;
  if (!Number(product_price)){
    return {
      error: 'Price must be a Number',
      product_price,
    };
  }
  if (!product_name || !product_desc || !product_imag || !product_price || !category) {
    const emptyFields = [];
    Object.keys(fields).forEach((field) => {
      if (fields[field].length <= 0) {
        emptyFields.push(field);
      }
    });
    return {
      error: 'Product creation Error. All fields are required',
      emptyFields,
    };
  }
  return null;
};

exports.UserValidator = (fields) => {
  const { email, username, password} = fields;
  if (!email || !username || !password ) {
    const emptyFields = [];
    Object.keys(fields).forEach((field) => {
      if (fields[field].length <= 0) {
        emptyFields.push(field);
      }
    });
    return {
      error: 'Account creation Error. All fields are required',
      emptyFields,
    };
  }
  return null;
};