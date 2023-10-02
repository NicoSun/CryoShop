const formidable = require('formidable');
const pool = require('../models/database');
const { SignUpValidator ,EmailValidator} = require('../utils/index');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");
// const { body, validationResult } = require('express-validator');
// const jwt = require('jsonwebtoken');
// const secretKey = process.env.SECRET; // Replace with your own secret key

const findUser = async (username) => {
  const User = await pool.query(
    'SELECT id, email, username, firstname, lastname, address, payment FROM users WHERE username = $1',
    [username]
    );
    return User.rows;
}
const findEmail = async (email) => {
  const User = await pool.query(
    'SELECT id, email, username, firstname, lastname, address, payment FROM users WHERE email = $1',
    [email]
    );
    return User.rows;
}

const checkUser = async (email, password) => {
  //... fetch user from a db
  try {
    const User = await pool.query(
      'SELECT password FROM users WHERE email = $1',
      [email]
      );
      // compare(plainPassword,hashedPassword)
    const match = await bcrypt.compare(password, User.rows[0].password);
    return match
  } catch (error) {
    return  false;
  }
}

exports.createUser = (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields) => {
      const { email, username, password, address, payment,firstname,lastname} = fields;
      // check for all fields
      if (SignUpValidator(fields)) {
        return res.status(400).json(SignUpValidator(fields));
      }
      if(EmailValidator(email)){
        return res.status(406).send("invalid email");
      }
      const existing = await findEmail(email);
      if (existing.length > 0){
        return res.status(409).send("Email already in use!");
      }
      try {
        const newID = uuidv4();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await pool.query(
          'INSERT INTO users (id, username, email, password, address, payment,firstname,lastname) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
          [newID,username, email, hashedPassword, address, payment,firstname,lastname]
        );

        if (newUser.rows){
          // const Userdata = {username: username, email:email};
          let Userdata = await findUser(username);
          Userdata = Userdata[0];
          Userdata.loggedin = true;
          res.json(Userdata);
        }
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
  // console.log("User Update Start!")
  const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields) => {
    const { id,email, username, address, payment,firstname,lastname} = fields;

    if(EmailValidator(email)){
      return res.status(406).send("invalid email");
    }
    const existing = await findEmail(email);
    if (existing.length > 0  && existing.rows[0].email != email){
      return res.status(409).send("Email already in use!");
    }

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

  exports.updatePassword = async (req, res, next) => {
    const form = new formidable.IncomingForm();
      form.keepExtensions = true;
      form.parse(req, async (err, fields) => {
        const { id, password} = fields;
  
        try {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const newUser = await pool.query(
            'UPDATE users SET password = $1 WHERE id = $2',
            [hashedPassword,id]
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
  const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields) => {
      const { id, email, password} = fields;

      const passwordCheck = await checkUser(email,password);
      if(!passwordCheck){
        return res.status(401).send("invalid authentication");
      }
    try {
      const oldUser = await pool.query('DELETE FROM users WHERE id = $1', [id]);
      return res.status(200).send(`User deleted with ID: ${id}`);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error,
      });
    }
  });
  };

// complete after data security integration
exports.loginUser = async (req, res, next) => {
  const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields) => {
      const { email, password} = fields;

      if(EmailValidator(email)){
        return res.status(406).send("invalid email");
      }
      if (!email && !password){
        return res.status(401).send("invalid authentication");
      }

      const passwordCheck = await checkUser(email,password);
      
      if(!passwordCheck){
        return res.status(401).send("invalid authentication");
      }

      if (passwordCheck) {
        const User = await findEmail(email);
          // console.log(User.rows)
          const Userdata = User[0];
          if (User.length > 0){
            Userdata.loggedin = true;
            res.json(Userdata);

            // Create a JWT token
            // const token = jwt.sign(Userdata, secretKey, { expiresIn: '1h' });
            // Send the token as a response
            // res.json({ token });
          } else {
            res.send("Incorrect Username and/or Password!");
            return res.status(401);
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