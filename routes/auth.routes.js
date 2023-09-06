const controller = require("../controllers/auth.controller");
const verifySignUp = require("../middleware/verifySignUp");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept",
    );
    next();
  });

  app.get("/login", (req, res) => res.render("login"));

  app.get("/register", (req, res) => res.render("register-customer"));

  app.get("/register-vendor", (req, res) => res.render("register-vendor"));

  app.get("/register-shipper", (req, res) => res.render("register-shipper"));

  app.get("/logout", (req, res) => {
    req.flash("success_msg", "You are logged out");
    res.redirect("/login");
  });

  app.post(
    "/register/customer",
    [verifySignUp.checkDuplicateUsername, verifySignUp.checkRolesExisted],
    controller.signUpCustomer,
  );
  app.post(
    "/register/vendor",
    [
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkRolesExisted,
      verifySignUp.checkDuplicateBusName,
      verifySignUp.checkDuplicateBusAddress,
    ],
    controller.signUpVendor,
  );
  app.post(
    "/register/shipper",
    [verifySignUp.checkDuplicateUsername, verifySignUp.checkRolesExisted],
    controller.signUpShipper,
  );

  app.post("/login", controller.signin);
};