const db = require("../models/init");
const User = db.users;

var bcrypt = require("bcryptjs");

const signUpGeneric = async (user_type, request_body) => {
  const {
    username,
    password,
    name,
    address,
    businessName,
    businessAddress,
    distributionHub,
  } = request_body;

  if (user_type === "customer") {
    await User.create({
      username: username,
      passwordHash: bcrypt.hashSync(password, 8),
      name: name,
      address: address,
      role: user_type,
    });
  } else if (user_type === "vendor") {
    await User.create({
      username: username,
      passwordHash: bcrypt.hashSync(password, 8),
      name: name,
      businessName: businessName,
      businessAddress: businessAddress,
      role: user_type,
    });
  } else if (user_type === "shipper") {
    await User.create({
      username: username,
      passwordHash: bcrypt.hashSync(password, 8),
      name: name,
      distributionHub: distributionHub,
      role: user_type,
    });
  }
};

exports.signUpCustomer = (req, res) => {
  try {
    signUpGeneric("customer", req.body);
    req.flash("success_msg", "Customer created successfully");
    res.redirect("/login");
  } catch (error) {
    req.flash("error_msg", "Unexpected error occurred", error.message);
    res.redirect("back");
  }
};

exports.signUpVendor = (req, res) => {
  try {
    signUpGeneric("vendor", req.body);
    req.flash("success_msg", "Vendor created successfully");
    res.redirect("/login");
  } catch (error) {
    req.flash("error_msg", "Unexpected error occurred", error.message);
    res.redirect("back");
  }
};

exports.signUpShipper = (req, res) => {
  try {
    signUpGeneric("shipper", req.body);
    req.flash("success_msg", "Customer created successfully");
    res.redirect("/login");
  } catch (error) {
    req.flash("error_msg", "Unexpected error occurred", error.message);
    res.redirect("back");
  }
};

exports.signin = (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        req.flash("error_msg", "User Not found.");
        return res.redirect("back");
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.passwordHash,
      );

      if (!passwordIsValid) {
        req.flash("error_msg", "Invalid Password!");
        return res.redirect("back");
      }

      res.render("dashboard", { title: "Dashboard", user: user });
    })
    .catch((err) => {
      req.flash("error_msg", "Unexpected error occurred", err.message);
      res.redirect("back");
    });
};
