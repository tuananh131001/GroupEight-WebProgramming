const db = require("../models/init");
const Product = db.product;
const fs = require('fs'); // For file handling
const { v4: uuidv4 } = require('uuid'); // For generating unique filenames
const path = require('path');

// Function to handle image uploads
const handleImageUpload = (imageData) => {
    const uniqueFilename = `${uuidv4()}.jpg`; // Generate a unique filename
    const imagePath = path.join(__dirname, '../uploads', uniqueFilename); // Set the path for the uploaded image
  
    fs.writeFileSync(imagePath, imageData); // Write the image data to the file
    return uniqueFilename;
  };

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        // Extract product data from the request body
        const { name, price, description, image } = req.body;
    
        // Handle image upload
        const imageData = Buffer.from(image, 'base64');
        const uniqueFilename = handleImageUpload(imageData);
    
        // Create a new product instance
        const product = new Product({
          name,
          price,
          description,
          image: {
            data: imageData,
            contentType: 'image/jpg', // Set the appropriate content type here
            filename: uniqueFilename,
          },
        });
    
        // Save the product to the database
        await product.save();
        res.status(201).json(product);
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

// Get a specific product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product by ID
exports.updateProductById = async (req, res) => {
 try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update product fields (except for the image)
    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;

    // Handle image upload if provided
    if (req.body.image) {
      const imageData = Buffer.from(req.body.image, 'base64');
      const uniqueFilename = handleImageUpload(imageData);

      // Update the product's image field
      product.image.data = imageData;
      product.image.contentType = 'image/png'; // You can set the appropriate content type here

      // Remove the old image file if it exists
      if (product.image.filename) {
        const oldImagePath = path.join(__dirname, '../uploads', product.image.filename);
        fs.unlinkSync(oldImagePath);
      }

      // Store the new image filename
      product.image.filename = uniqueFilename;
    }

    // Save the updated product
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a product by ID
exports.deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
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