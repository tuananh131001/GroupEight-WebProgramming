const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../middleware/auth");
const { product } = require("../models/init");
const db = require("../models/init");
const Product = db.product;

module.exports = function (app) {
  app.get("/", async (req, res) => {

    const products = await Product.find({});
    res.render("welcome", { products });
  });

  app.get("/dashboard", ensureAuthenticated, (req, res) =>
    req.user
      ? res.render("dashboard", { user: req.user })
      : res.redirect("/login")
  );

  ///support

  app.get("/support", (req, res) => res.render("support"));

  app.get("/privacy-policy", (req, res) => res.render("privacy-policy"));
  app.get("/about-us", (req, res) => res.render("about-us"));

};
