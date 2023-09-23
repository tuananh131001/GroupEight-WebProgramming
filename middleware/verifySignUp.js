/* <!-- // RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023B
// Assessment: Full-stack Web Application
// Author: Team Eight
// Acknowledgement: Google , Stackoverflow, w3schools --> */

const db = require("../models/init");
const ROLES = db.ROLES;
const User = db.users;

const checkDuplicateUsername = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        req.flash("error_msg", "Username already exists");
        return res.redirect("back");
      }
      next();
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    });
};

const checkDuplicateBusName = (req, res, next) => {
  User.findOne({
    businessName: req.body.businessName,
    role: "vendor",
  })
    .then((user) => {
      if (user) {
        req.flash("error_msg", "Business name already exists");
        return res.redirect("back");
      }
      next();
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    });
};

const checkDuplicateBusAddress = (req, res, next) => {
  User.findOne({
    businessAddress: req.body.businessAddress,
    role: "vendor",
  })
    .then((user) => {
      if (user) {
        req.flash("error_msg", "Business address already exists");
        return res.redirect("back");
      }
      next();
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    });
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        req.flash("error_msg", "Role does not exist");
        return res.redirect("back");
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsername: checkDuplicateUsername,
  checkRolesExisted: checkRolesExisted,
  checkDuplicateBusName: checkDuplicateBusName,
  checkDuplicateBusAddress: checkDuplicateBusAddress,
};

module.exports = verifySignUp;
