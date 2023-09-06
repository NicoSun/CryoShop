const formidable = require('formidable');
const pool = require('../models/database');
const { UserValidator } = require('../utils/index');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");

const finduser = async (username) => {
  const User = await pool.query(
    'SELECT id, email, username, firstname, lastname, address, payment FROM users WHERE username = $1',
    [username]
    );
    return User.rows;
}

exports.createUser = (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields) => {
      const { email, username, password, address, payment,firstname,lastname} = fields;
      // check for all fields
      if (UserValidator(fields)) {
        return res.status(400).json(UserValidator(fields));
      }
      if (await finduser(username).length > 0){
        res.send("Username already exists!");
        res.end();
        return next();
      }
      try {
        const newID = uuidv4();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await pool.query(
          'INSERT INTO users (id, username, email, password, address, payment,firstname,lastname) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
          [newID,username, email, hashedPassword, address, payment,firstname,lastname]
        );
        return res.status(201).send(`User added: ${newUser.rowCount}`);
      } catch (error) {
        return res.status(400).json({
          error,
        });
      }
    });
  };

exports.getAllUsers = async (req, res, next) => {
  try {
      const User = await pool.query(
      'SELECT * FROM users'
      );
      req.User = User.rows;
      return next();
} catch (err) {
    return res.status(400).json({
    error: err,
    });
}
};

exports.getUserByName = async (req, res, next) => {
const username = req.params.name;
try {
    req.User = await finduser(username);
    if (req.User.length > 0){
      return next();
    } else {
      res.send("User doesn't exist!")
    } 
} catch (err) {
    return res.status(400).json({
    error: err,
    });
}
};


exports.updateUser = async (req, res, next) => {
  console.log("User Update Start!")
  const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields) => {
      console.log(fields)
      const { id,email, username,firstname,lastname,address, payment} = fields;
      // check for all fields
      // if (UserValidator(fields)) {
      //   return res.status(400).json(UserValidator(fields));
      // }
      try {
        const newUser = await pool.query(
          'UPDATE users SET email = $1, username = $2, firstname = $3, lastname = $4, address = $5, payment = $6 WHERE id = $7',
          [email, username,firstname,lastname,address,payment,id]
        );
        return res.status(201).send(`User updated: ${newUser.rowCount}`);
      } catch (error) {
        return res.status(400).json({
          error,
        });
      }
    });
  };


exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
      await pool.query('DELETE FROM users WHERE id = $1', [id]);
      return res.status(200).send(`User deleted with ID: ${id}`);
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  };

// complete after data security integration
exports.loginUser = async (req, res, next) => {
  const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields) => {
      const { email, username, password} = fields;
      if (username && password) {
        const User = await pool.query(
          `SELECT * FROM users WHERE username = $1 AND password = $2`,
          [username, password],
          );
          console.log(User.rows)
          // console.log(User.rows)
          if (User.rows){
            // req.session.loggedin = true;
            // req.session.username = User["username"];
            // req.session.email = User["email"];
            res.send("match found!")
            // res.redirect("/");
          } else {
            res.send("Incorrect Username and/or Password!");
          }
          return next();
      } else {
        res.send("Please enter Username and Password!");
        res.end();
      }
    });
};

// complete after data security integration
exports.logoutUser = async (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
    } else {
      res.redirect('/');
    }
  });
  };

exports.userProfile = async (req, res, next) => {
  const username = req.session.username;
  const isLoggedIn = req.session.isLoggedIn;
  res.send(`Username: ${username}, Logged In: ${isLoggedIn}`);
  };
  
exports.read = (req, res) => res.json(req.User);