const checkUserRole = require('../middleware/checkRole');
const productController = require('../controllers/product.controller'); // Import the controller
const uploadImage = require('../middleware/uploadImage')
// Routes
module.exports = function (app) {
app.post('/products/vendors-only', checkUserRole('vendor'), uploadImage.single('image'), productController.createProduct);
app.get('/products', productController.getAllProducts);
app.get('/products/:id', productController.getProductById);
app.put('/products/vendors-only/:id', checkUserRole('vendor'), uploadImage.single('image'), productController.updateProductById);
app.delete('/products/vendors-only/:id', checkUserRole('vendor'), productController.deleteProductById);
app.get('/products/filter', productController.getFilteredProducts);
};