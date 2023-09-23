const uploadImage = require("../middleware/uploadImage");
const userController = require("../controllers/user.controller");
const { ensureAuthenticated } = require("../middleware/auth");
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

  app.get("/profile", ensureAuthenticated, async (req, res) => {
    if (req.user.role === "shipper") {
      const hub = await Hub.findById(req.user.distributionHub);
      res.render("profile", { user: req.user, hub });
    } else {
      res.render("profile", { user: req.user, hub: null });
    }
  });

  app.get("/profile/edit", ensureAuthenticated, async (req, res) => {
    if (req.user.role === "customer") {
      res.render("profile-edit", { user: req.user, hubs: null });
    } else if (req.user.role === "vendor") {
      res.render("profile-edit", { user: req.user, hubs: null });
    } else if (req.user.role === "shipper") {
      const hubs = await Hub.find({});
      res.render("profile-edit", { user: req.user, hubs });
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
