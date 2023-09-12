const { ensureAuthenticated, forwardAuthenticated } = require("../middleware/auth");

module.exports = function (app) {
  app.get("/", forwardAuthenticated, (req, res) => res.render("welcome"));

  app.get("/dashboard", ensureAuthenticated, (req, res) =>
    req.user
      ? res.render("dashboard", { user: req.user })
      : res.redirect("/login")
  );
};
