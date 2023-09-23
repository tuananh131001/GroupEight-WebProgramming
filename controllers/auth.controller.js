const db = require("../models/init");
const User = db.users;
const LocalStrategy = require('passport-local').Strategy;
const Image = db.image;


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
    avatar
  } = request_body;

  if (!username || !password) {
    throw new Error("Missing required fields");
  }

  if (user_type === "customer") {
    await User.create({
      username: username,
      passwordHash: bcrypt.hashSync(password, 8),
      name: name,
      address: address,
      avatar: avatar,
      role: user_type,
    });
  } else if (user_type === "vendor") {
    await User.create({
      username: username,
      passwordHash: bcrypt.hashSync(password, 8),
      name: name,
      businessName: businessName,
      avatar: avatar,
      businessAddress: businessAddress,
      role: user_type,
    });
  } else if (user_type === "shipper") {
    await User.create({
      username: username,
      passwordHash: bcrypt.hashSync(password, 8),
      name: name,
      avatar: avatar,
      distributionHub: distributionHub,
      role: user_type,
    });
  }
};

exports.signUpCustomer = async (req, res) => {
  try {
    const file = req.file.buffer;
    const image = await Image.create({
      file: file,
    });

    // add image id to user
    req.body.avatar = image._id;
    await signUpGeneric("customer", req.body);
    req.flash("success_msg", "Customer created successfully");
    res.redirect("/login");
  } catch (error) {
    // handle missing file
    req.flash("error_msg", "Unexpected error occurred", error.message);
    res.redirect("back");
  }
};

exports.signUpVendor = async (req, res) => {
  
  try {
    await signUpGeneric("vendor", req.body);
    req.flash("success_msg", "Vendor created successfully");
    res.redirect("/login");
  } catch (error) {
    req.flash("error_msg", "Unexpected error occurred", error.message);
    res.redirect("back");
  }
};

exports.signUpShipper = async (req, res) => {
  try {
    await signUpGeneric("shipper", req.body);
    req.flash("success_msg", "Shipper created successfully");
    res.redirect("/login");
  } catch (error) {
    req.flash("error_msg", "Unexpected error occurred", error.message);
    res.redirect("back");
  }
};
