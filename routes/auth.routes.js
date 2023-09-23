// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023B
// Assessment: Full-stack Web Application
// Author: Team Eight
// Acknowledgement: Google , Stackoverflow, w3schools
const controller = require("../controllers/auth.controller");
const verifySignUp = require("../middleware/verifySignUp");
const uploadImage = require("../middleware/uploadImage");
const passport = require("passport");
const db = require("../models/init");
const Hub = db.hub;

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/login", (req, res) => res.render("login"));

  app.get("/register", (req, res) => res.render("register-customer"));

  app.get("/register-vendor", (req, res) => res.render("register-vendor"));

 

  app.get("/register-shipper", async (req, res) => {
    try {
      const hubs = await Hub.find({});
      await res.render("register-shipper", { hubs});
    } catch (error) {
      req.flash("error_msg", "Unexpected error occurred", error.message);
      res.redirect("back");
    }
  });

  app.get("/logout", function (req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      req.flash("success_msg", "You are logged out");
      res.redirect("/login");
    });
  });

  app.post(
    "/register/customer",
    [verifySignUp.checkDuplicateUsername, verifySignUp.checkRolesExisted],
    uploadImage.single("avatar"),
    controller.signUpCustomer
  );
  app.post(
    "/register/vendor",
    [
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkRolesExisted,
      verifySignUp.checkDuplicateBusName,
      verifySignUp.checkDuplicateBusAddress,
    ],
    uploadImage.single("avatar"),
    controller.signUpVendor
  );
  app.post(
    "/register/shipper",
    [verifySignUp.checkDuplicateUsername, verifySignUp.checkRolesExisted],
    uploadImage.single("avatar"),
    controller.signUpShipper
  );

  app.post(
    "/login",
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    (req, res) => {
      if (req.user.role === "customer") {
        res.redirect("/");
      }
      if (req.user.role === "vendor") {
        res.redirect("/dashboard");
      }
      if (req.user.role === "shipper") {
        res.redirect("/shipper-orders");
      }
    }
  );
};
