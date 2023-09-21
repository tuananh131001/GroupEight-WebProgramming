const uploadImage = require("../middleware/uploadImage");

exports.updateProfile = async (req, res, next) => {
  try {
    const user = req.user;
    console.log(user)
    const { name, address, businessName, businessAddress } = req.body;
    const avatar = req.file.filename;

    if (user.role === "customer") {
      user.name = name;
      user.address = address;
      user.avatar = avatar;
    } else if (user.role === "vendor") {
      user.businessName = businessName;
      user.businessAddress = businessAddress;
      user.avatar = avatar;
    } else if (user.role === "shipper") {
      user.distributionHub = distributionHub;
      user.avatar = avatar;
    } else {
      req.flash("error_msg", "Unexpected error occurred", error.message);
      res.redirect("back");
    }

    await user.save();

    req.flash("success_msg", "Updated successfully");
    res.redirect("/profile");
  } catch (error) {
    req.flash("error_msg", "Unexpected error occurred", error.message);
    res.redirect("back");
  }
};
