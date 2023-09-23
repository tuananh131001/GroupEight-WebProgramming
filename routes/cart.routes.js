const checkUserRole = require("../middleware/checkRole");
const cartController = require("../controllers/cart.controller");
const uploadImage = require("../middleware/uploadImage");

module.exports = function (app) {
    // for vendors
    app.get(
      "/products/shopping-cart",
      checkUserRole("customer"),
      cartController.getMyCart
    );
    app.post(
        "/products/add-to-cart",
        checkUserRole("customer"),
        uploadImage.single("image"),
        cartController.addToCart
    )
};