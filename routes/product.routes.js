const checkUserRole = require("../middleware/checkRole");
const productController = require("../controllers/product.controller"); // Import the controller
const uploadImage = require("../middleware/uploadImage");
// Routes
module.exports = function (app) {
  // for vendors
  app.get('/products/vendor-only/add-my-product', (req, res) => {
    res.render('createProduct'); 
  });
  app.post(
    "/products/vendors-only/my-products",
    checkUserRole("vendor"),
    uploadImage.single("image"),
    productController.createProduct,
  );
  app.put(
    "/products/vendors-only/my-products",
    checkUserRole("vendor"),
    uploadImage.single("image"),
    productController.updateProductByName,
  );
  app.get("products/vendors-only/my-products", 
  checkUserRole("vendor"),
  productController.getMyProducts,
  )
  app.delete(
    "/products/vendors-only/my-products",
    checkUserRole("vendor"),
    productController.deleteProductByName,
  );
  // for customers
  app.get("/products", productController.getAllProducts);
  app.get("/products/:id", productController.getProductById);
  app.get("/products/filter", productController.getFilteredProducts);
  app.get("/products/:name", productController.getProductByName);
};

