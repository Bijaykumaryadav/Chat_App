const express = require("express");
const dotenv = require("dotenv");
const dbConnection = require("./config/db");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const passportGoogle = require("./config/passport-google-strategy");
const passportJwtStrategy = require("./config/passport-jwt-strategy");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

// for routes to accept the json files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(
  session({
    name: "chatApp",
    secret: process.env.SESSION_COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 80 * 60,
    },
    store: new MongoStore(
      {
        mongoUrl: process.env.MONGO_URI,
      },
      {
        mongooseConnection: dbConnection,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || `successfully added mongostore `);
      }
    ),
  })
);

//for using passport
app.use(passport.initialize());
app.use(passport.session());

dbConnection();

// Static route to serve images
app.use("/uploads", express.static("uploads"));

// Define routes
app.use("/api", require("./routes"));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
