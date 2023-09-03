const db = require("../models/init");
const ROLES = db.ROLES;
const User = db.users;

const checkDuplicateUsername = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        return res
          .status(400)
          .json({ message: "Failed! Username is already in use!" });
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
        return res
          .status(400)
          .json({ message: "Failed! businessName is already in use!" });
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
        return res
          .status(400)
          .json({ message: "Failed! businessAddress is already in use!" });
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
        return res.status(400).json({
          message: "Failed! Role does not exist: " + req.body.roles[i],
        });
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsername: checkDuplicateUsername,
  checkRolesExisted: checkRolesExisted,
  checkDuplicateBusName: checkDuplicateBusName,
  checkDuplicateBusAddress: checkDuplicateBusAddress
};

module.exports = verifySignUp;
