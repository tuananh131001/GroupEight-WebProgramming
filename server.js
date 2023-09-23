const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require('passport');

require("dotenv").config();
// Passport Config
require('./middleware/passport')(passport);

const app = express();
const mongoose = require("mongoose");
const db = require("./models/init");

app.use(express.urlencoded({ extended: true }));

app.use('/public/', express.static('./public'));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  }),
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

require("./routes/auth.routes")(app);
require("./routes/product.routes")(app);
require("./routes/index.routes")(app);
require("./routes/user.routes")(app);
require("./routes/image.routes")(app);

const Hub = db.hub;

const hubs = [
  {
    name: "Ho Chi Minh",
    address: "Ho Chi Minh",
  },
  {
    name: "Da Nang",
    address: "Da Nang",
  },
  {
    name: "Hanoi",
    address: "Hanoi",
  },
];

Hub.insertMany(hubs)
  .then(() => {
    console.log("Hubs added successfully");
  })
  .catch((err) => {
    if (err.code === 11000) {
      console.log("Hubs already exist");
    }
  });

mongoose
  .connect(db.mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
