const db = require("../models/init");
const Product = db.product;

// Create a new product
exports.createProduct = async (req, res) => {
try {
  // Extract product data from the request body
  const { name, price, description } = req.body;

  // Handle image upload using multer
  const imageData = req.file.buffer; // Binary image data
  const contentType = req.file.mimetype;

  // Create a new product instance with the image data
  const newProduct = new Product({
    name,
    price,
    description,
    image: {
      data: imageData,
      contentType: contentType,
    },
  });

  // Save the new product to the database
  await newProduct.save();
  res.status(201).json(newProduct);
} catch (error) {
  res.status(500).json({ error: error.message });
}
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific product by Name
exports.getProductByName = async (req, res) => {
  try {
    const productName = req.params.name;

    // Use Mongoose to find products by name (case-insensitive)
    const products = await Product.find({
      name: { $regex: new RegExp(productName, 'i') }, // Case-insensitive search
    });

    if (products.length === 0) {
      return res.status(404).json({ error: 'No products found with that name.' });
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Update a product by Name
exports.updateProductByName = async (req, res) => {
try {
  // Extract product data from the request body
  const { name, price, description } = req.body;

  // Handle image upload using multer
  const imageData = req.file.buffer; // Binary image data
  const contentType = req.file.mimetype;

  // Find the product by Name
  const productName = req.params.name;

    // Use Mongoose to find products by name (case-insensitive)
    const products = await Product.find({
      name: { $regex: new RegExp(productName, 'i') }, // Case-insensitive search
    });

    if (products.length === 0) {
      return res.status(404).json({ error: 'No products found with that name.' });
    }

  // Update the product properties
  product.name = name;
  product.price = price;
  product.description = description;
  product.image.data = imageData;
  product.image.contentType = contentType;

  // Save the updated product to the database
  await product.save();
  res.status(200).json(product);
} catch (error) {
  res.status(500).json({ error: error.message });
}
};

// Delete a product by name
exports.deleteProductByName = async (req, res) => {
  try {
    const productName = req.params.name;
 // Use Mongoose to find and delete a product by name
 const deletedProduct = await Product.findOneAndDelete({
  name: { $regex: new RegExp(productName, 'i') }, // Case-insensitive search
});

 if (!deletedProduct) {
   return res.status(404).json({ error: 'Product not found.' });
 }

 res.json({ message: 'Product deleted successfully', deletedProduct });
} catch (error) {
 res.status(500).json({ error: error.message });
}
};

//filter products by min and max price
exports.getFilteredProducts = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;

    //Build a query object for the MongoDB aggregation pipeline
    const pipeline = [];

    //Match products within the price range (if both min and max prices are provided)
    if (minPrice !== undefined && maxPrice !== undefined) {
      const minPriceFloat = parseFloat(minPrice);
      const maxPriceFloat = parseFloat(maxPrice);
      pipeline.push({
        $match: {
          price: { $gte: minPriceFloat, $lte: maxPriceFloat },
        },
      });
    }

    // Aggregate the products
    const products = await Product.aggregate(pipeline);

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};