// Useful projects:
// external-api
// to-di-list
// mvc
// acme bank in Data Security (user management)
// passport in node/express for user authentication


const express = require('express');
const session = require("express-session");
const pg = require('pg');

// security packages
const cors = require('cors'); // Import the cors package
const csurf = require("csurf");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
require('dotenv').config();

// // import routes
const ProductRoutes = require('./routes/Products');
// const StoreRoutes = require('./routes/Store');
const UserRoutes = require('./routes/Users');
const OrderRoutes = require('./routes/Orders');

// Running express server
const app = express();
const port = process.env.Backend_PORT;
const frontport = process.env.Frontend_PORT; // Replace with your React frontend's URL

// Use Helmet!
app.use(helmet());

//CSRF FIX
app.use(cookieParser());
const csrfMiddleware = csurf({
  cookie: {
    sameSite: "none",
  },
});
app.use((error, request, response, next) => {
  if (error.code === "EBADCSRFTOKEN") {
    response.status(403);
    response.send("The CSRF token is invalid");
  } else {
    next();
  }
});
//CSRF FIX END

// session cookie with timeout
app.use(
  session({
    secret: "gu$035cJ£cx9*J90mn^V87t6bz",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000, //one hour
      secure: true,
      httpOnly: true,
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// only allow own frontend server to access backend
const corsOptions = {
  origin: `http://localhost:${frontport}` 
};

// app.use(cors(corsOptions));
app.use(cors());

// route middlewares
app.use('/api/Products', ProductRoutes);
// app.use('/api/Store', StoreRoutes);
app.use('/api/Users', UserRoutes);
app.use('/api/Orders', OrderRoutes);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at http://localhost:${port}`);
});