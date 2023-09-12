const uploadImage = require("../middleware/uploadImage");
const userController = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/profile", (req, res) => res.render("profile"));

  app.post("/profile", uploadImage.single("avatar"), userController.updateProfile);
};
