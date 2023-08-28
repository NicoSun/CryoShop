const formidable = require('formidable');
const pool = require('../models/database');
const { UserValidator } = require('../utils/index');
const { v4: uuidv4 } = require('uuid');


exports.createUser = (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields) => {
      const { email, username, password, address, card_details,firstname,lastname} = fields;
      // check for all fields
      if (UserValidator(fields)) {
        return res.status(400).json(UserValidator(fields));
      }
      try {
        const newID = uuidv4();
        const newUser = await pool.query(
          'INSERT INTO users (id, username, email, password, address, card_details,firstname,lastname) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
          [newID,username, email, password, address, card_details,firstname,lastname]
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
    const User = await pool.query(
    'SELECT * FROM users WHERE username = $1',
    [username]
    );
    req.User = User.rows;
    return next();
} catch (err) {
    return res.status(400).json({
    error: err,
    });
}
};


exports.updateUser = async (req, res, next) => {
  const id = req.params.id;
  const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields) => {
      const { username, password, address,firstname,lastname} = fields;
      // check for all fields
      if (UserValidator(fields)) {
        return res.status(400).json(UserValidator(fields));
      }
      try {
        const newUser = await pool.query(
          'UPDATE users SET username = $1, password = $2, address = $3, firstname = $4, lastname = $5 WHERE id = $6',
          [username, password, address,firstname,lastname,id]
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
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    db.get(
      `SELECT * FROM users WHERE username = ? AND password = ?`,
      [username, password],
      function (error, results) {
        console.log(error);
        console.log(results);
        if (results) {
          req.session.loggedin = true;
          req.session.username = results["username"];
          res.redirect("/home");
        } else {
          res.send("Incorrect Username and/or Password!");
        }
        res.end();
      }
    );
  } else {
    res.send("Please enter Username and Password!");
    res.end();
  }
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