// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023B
// Assessment: Full-stack Web Application
// Author: Team Eight
// Acknowledgement: Google , Stackoverflow, w3schools
const checkUserRole = require("../middleware/checkRole");
const cartController = require("../controllers/cart.controller");
const uploadImage = require("../middleware/uploadImage");

module.exports = function (app) {
    // for vendors
    app.get(
      "/carts",
      checkUserRole("customer"),
      cartController.getMyCart
    );
    app.post(
        "/products/add-to-cart",
        checkUserRole("customer"),
        cartController.addToCart
    );
    app.post(
      "/cart/delete/:id",
      checkUserRole("customer"),
      cartController.deleteCart
    )
};