/* <!-- // RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023B
// Assessment: Full-stack Web Application
// Author: Team Eight
// Acknowledgement: Google , Stackoverflow, w3schools --> */

const db = require("../models/init");
const User = db.users;
const LocalStrategy = require("passport-local").Strategy;
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
    avatar,
  } = request_body;

  if (!username || !password) {
    throw new Error("Missing required fields");
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;

  if (!passwordRegex.test(password)) {
    throw new Error(
      "Password must contain at least one upper case letter, at least one lower case letter, at least one digit, at least one special letter in the set !@#$%^&*, NO other kind of characters, has a length from 8 to 20 characters."
    );
  }

  const usernameRegex = /^[a-zA-Z0-9]+$/;

  if (!usernameRegex.test(username)) {
    throw new Error(
      "Username must contain only letters (lower and upper case) and digits, has a length from 8 to 15 characters, unique."
    );
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
    if (!req.file) {
      throw new Error("Missing avatar");
    }
    const file = req.file.buffer;
    const image = await Image.create({
      file: file,
    });

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
    if (!req.file) {
      throw new Error("Missing avatar");
    }
    const file = req.file.buffer;
    const image = await Image.create({
      file: file,
    });

    req.body.avatar = image._id;
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
    if (!req.file) {
      throw new Error("Missing avatar");
    }
    const file = req.file.buffer;
    const image = await Image.create({
      file: file,
    });

    req.body.avatar = image._id;
    await signUpGeneric("shipper", req.body);
    req.flash("success_msg", "Shipper created successfully");
    res.redirect("/login");
  } catch (error) {
    req.flash("error_msg", "Unexpected error occurred", error.message);
    res.redirect("back");
  }
};
