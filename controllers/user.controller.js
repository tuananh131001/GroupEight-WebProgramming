/* <!-- // RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023B
// Assessment: Full-stack Web Application
// Author: Team Eight
// Acknowledgement: Google , Stackoverflow, w3schools --> */

const db = require("../models/init.js");
const Image = db.image;
const User = db.users;

exports.updateProfile = async (req, res, next) => {
  try {
    const user = req.user;
    const { name, address, businessName, businessAddress, distributionHub } = req.body;
    const tempUser = user;

    if (req.file?.buffer) {
      const avatarData = req.file.buffer;
      const avatar = await Image.create({
        file: avatarData,
      });
      tempUser.avatar = avatar._id;
    }

    if (user.role === "customer") {
      tempUser.name = name;
      tempUser.address = address;
    } else if (user.role === "vendor") {
      tempUser.businessName = businessName;
      tempUser.businessAddress = businessAddress;
    } else if (user.role === "shipper") {
      tempUser.distributionHub = distributionHub;
    } else {
      req.flash("error_msg", "Unexpected error occurred", error.message);
      res.redirect("back");
    }

    const saveUser = await User.findOneAndUpdate({ _id: user._id }, tempUser, {
      new: true,
    });

    if (!saveUser) {
      req.flash("error_msg", "User not found");
      return res.redirect("back");
    }

    req.flash("success_msg", "Updated successfully");
    res.redirect("/profile");
  } catch (error) {
    req.flash("error_msg", "Unexpected error occurred", error.message);
    res.redirect("back");
  }
};
