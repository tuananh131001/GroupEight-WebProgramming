const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");

require("dotenv").config();

const app = express();
const mongoose = require("mongoose");
const db = require("./models/init");

app.use(express.urlencoded({ extended: true }));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// TEST
let products = require('./products');
console.log(products);

app.get('/products', (req, res) => {
    res.render('products', {products: products});
});


// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  }),
);

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

mongoose
  .connect(db.mongoDBUrl)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
