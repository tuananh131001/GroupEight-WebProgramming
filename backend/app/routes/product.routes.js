const express = require('express');
const mongoose = require('mongoose');
const productController = require('./controllers/product.controller'); // Import the controller

const app = express();
const port = 3000;

app.use(express.json());

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost/your_database_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.post('/products', productController.createProduct);
app.get('/products', productController.getAllProducts);
app.get('/products/:id', productController.getProductById);
app.put('/products/:id', productController.updateProductById);
app.delete('/products/:id', productController.deleteProductById);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});