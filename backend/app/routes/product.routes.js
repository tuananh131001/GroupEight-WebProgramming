const productController = require('../controllers/product.controller'); // Import the controller

// Routes
module.exports = function (app) {
app.post('/products', productController.createProduct);
app.get('/products', productController.getAllProducts);
app.get('/products/:id', productController.getProductById);
app.put('/products/:id', productController.updateProductById);
app.delete('/products/:id', productController.deleteProductById);
app.get('/products/filter', productController.getFilteredProducts);
};