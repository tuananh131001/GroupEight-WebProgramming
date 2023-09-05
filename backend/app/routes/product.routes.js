const checkUserRole = require('./middleware/checkUserRole');
const productController = require('../controllers/product.controller'); // Import the controller

// Routes
module.exports = function (app) {
app.post('/products', checkUserRole('vendor'), productController.createProduct);
app.get('/products', productController.getAllProducts);
app.get('/products/:id', productController.getProductById);
app.put('/products/:id', checkUserRole('vendor'), productController.updateProductById);
app.delete('/products/:id', checkUserRole('vendor'), productController.deleteProductById);
app.get('/products/filter', productController.getFilteredProducts);
};