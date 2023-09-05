const checkUserRole = require('../middleware/checkRole');
const productController = require('../controllers/product.controller'); // Import the controller
const uploadImage = require('../middleware/uploadImage')
// Routes
module.exports = function (app) {
app.post('/products/vendors-only', checkUserRole('vendor'), uploadImage.single('image'), productController.createProduct);
app.get('/products', productController.getAllProducts);
app.get('/products/:id', productController.getProductByName);
app.put('/products/vendors-only/:id', checkUserRole('vendor'), uploadImage.single('image'), productController.updateProductByName);
app.delete('/products/vendors-only/:id', checkUserRole('vendor'), productController.deleteProductByName);
app.get('/products/filter', productController.getFilteredProducts);
};