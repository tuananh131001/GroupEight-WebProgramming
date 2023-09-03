const db = require("../models/init");
const config = require("../config/auth.config");
const User = db.users;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signUpCustomer = (req, res) => {
  User.create({
    username: req.body.username,
    passwordHash: bcrypt.hashSync(req.body.password, 8),
    avatar: req.file ? req.file.filename : undefined,
    name: req.body.name,
    address: req.body.address,
    role: "customer",
  })
    .then(() => {
      res.send({ message: "Customer was registered successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signUpVendor = (req, res) => {
  User.create({
    username: req.body.username,
    passwordHash: bcrypt.hashSync(req.body.password, 8),
    profilePicture: req.file ? req.file.filename : undefined,
    name: req.body.name,
    businessName: req.body.businessName,
    businessAddress: req.body.businessAddress,
    role: "vendor",
  })
    .then(() => {
      res.send({ message: "Vendor was registered successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signUpShipper = (req, res) => {
  User.create({
    username: req.body.username,
    passwordHash: bcrypt.hashSync(req.body.password, 8),
    profilePicture: req.file ? req.file.filename : undefined,
    name: req.body.name,
    distributionHub: req.body.distributionHub,
    role: "shipper",
  })
    .then(() => {
      res.send({ message: "Shipper was registered successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.passwordHash
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        id: user.id,
        username: user.username,
        role: user.role,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
