const uploadImage = require("../middleware/uploadImage");
const userController = require("../controllers/user.controller");
const { ensureAuthenticated } = require("../middleware/auth");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/profile", ensureAuthenticated, (req, res) =>
    res.render("profile", { user: req.user })
  );

  app.get("/profile/edit", ensureAuthenticated, (req, res) => {
    if (req.user.role === "customer") {
      res.render("profile-edit", { user: req.user });
    } else if (req.user.role === "vendor") {
      res.render("profile-edit", { user: req.user });
    } else if (req.user.role === "shipper") {
      res.render("profile-edit", { user: req.user });
    } else {
      req.flash("error_msg", "Unexpected error occurred", error.message);
      res.redirect("back");
    }
  });

  app.post(
    "/profile/edit",
    ensureAuthenticated,
    uploadImage.single("avatar"),
    userController.updateProfile
  );
};
