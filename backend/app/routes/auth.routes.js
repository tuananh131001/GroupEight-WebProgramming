const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/signup/customer",
    [
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkRolesExisted,
    ],
    controller.signUpCustomer
  );
  app.post(
    "/api/signup/vendor",
    [
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkRolesExisted,
      verifySignUp.checkDuplicateBusName,
      verifySignUp.checkDuplicateBusAddress
    ],
    controller.signUpVendor
  );
  app.post(
    "/api/signup/shipper",
    [
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkRolesExisted,
    ],
    controller.signUpShipper
  );

  app.post("/api/signin", controller.signin);
};
