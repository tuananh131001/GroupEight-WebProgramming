module.exports = function (app) {
  app.get("/", (req, res) => res.render("welcome"));

  app.get("/dashboard", (req, res) =>
    req.user
      ? res.render("dashboard", { user: req.user })
      : res.redirect("/login"),
  );
};
