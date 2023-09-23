// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023B
// Assessment: Full-stack Web Application
// Author: Team Eight
// Acknowledgement: Google , Stackoverflow, w3schools
const checkUserRole = require("../middleware/checkRole");
const productController = require("../controllers/product.controller"); // Import the controller
const uploadImage = require("../middleware/uploadImage");
// Routes
module.exports = function (app) {
  // for vendors
  app.get(
    "/products/vendor-only/add-my-product",
    checkUserRole("vendor"),
    (req, res) => {
      res.render("createProduct");
    }
  );
  app.post(
    "/products/vendors-only/my-products",
    checkUserRole("vendor"),
    uploadImage.single("image"),
    productController.createProduct
  );
  // app.put(
  //   "/products/vendors-only/my-products",
  //   checkUserRole("vendor"),
  //   uploadImage.single("image"),
  //   productController.updateProductById,
  // );
  app.get(
    "/products/vendors-only/my-products",
    checkUserRole("vendor"),
    productController.getVendorMyProducts
  );
  app.post(
    "/products/vendors-only/my-products/:id/delete",
    checkUserRole("vendor"),
    productController.deleteProductById
  );
  app.get(
    "/products/vendors-only/my-products/:id",
    checkUserRole("vendor"),
    productController.getProductById
  );

  // for customers
  app.get("/products", productController.getAllProducts);
  app.get("/products/:id", productController.getProductById);
  app.get("/product/filter/", productController.getFilteredProducts);
  app.get("/product/search/", productController.getProductByName);
};
