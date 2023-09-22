const db = require("../models/init");
const Product = db.product;

// Create a new product
exports.createProduct = async (req, res, next) => {
  // Extract product data from the request body
  const { name, price, description } = req.body;
  // Handle image upload using multer
  const imageData = req.file.filename; // Binary image data
  try {
    // Create a new product instance with the image data
    const newProduct = new Product({
      name,
      price,
      description,
      image: imageData,
      vendor: req.user._id,
    });

    // Save the new product to the database
    await newProduct.save();
    // Render the EJS view
    req.flash("success_msg", `Product ${newProduct._id}  created successfully`);
    res.redirect("/products/vendors-only/my-products");
  } catch (error) {
    req.flash("error_msg", "Unexpected error occurred", error.message);
    res.redirect("back");
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    // Render the EJS view
    res.render("products", { products, user: req.user });
  } catch (error) {
    req.flash("error_msg", "Unexpected error occurred", error.message);
    res.redirect("back");
  }
};

// Get a specific product by Name
exports.getProductByName = async (req, res) => {
  try {
    const productName = req.params.name;

    // Use Mongoose to find products by name (case-insensitive)
    const products = await Product.find({
      name: { $regex: new RegExp(productName, "i") }, // Case-insensitive search
    });

    if (!products) {
      // If the product is not found, render an error page or handle it accordingly
      return res.status(404).render("error", { message: "Product not found" });
    }
    res.render("products", { products, productName });
  } catch (error) {
    req.flash("error_msg", "Unexpected error occurred", error.message);
    res.redirect("back");
  }
};
// Update a product by Id
exports.updateProductById = async (req, res) => {
  try {
    // Extract product data from the request body
    const { name, price, description } = req.body;

    // Handle image upload using multer
    const imageData = req.file.name;

    // Find the product by id
    const productId = req.params.id;

    // Use Mongoose to find products by name (case-insensitive)
    const product = await Product.findById(productId);

    if (product.length === 0) {
      return res.status(404).render("error", { message: "Product not found" });
    }

    // Update the product properties
    product.name = name;
    product.price = price;
    product.description = description;
    product.image.data = imageData;
    product.image.contentType = contentType;

    // Save the updated product to the database
    await product.save();
    // Render the EJS view
    res.status(201).render("index", { product });
  } catch (error) {
    req.flash("error_msg", "Unexpected error occurred", error.message);
    res.redirect("back");
  }
};

// Delete a product by Id
exports.deleteProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    // Use Mongoose to find and delete by Id
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (deletedProduct.deletedCount === 1) {
      res.redirect("/products/vendors-only/my-products");
    } else {
      return res.status(404).render("error", { message: "Product not found" });
    }
  } catch (error) {
    req.flash("error_msg", "Unexpected error occurred", error.message);
    res.redirect("back");
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

    // Render a list of filtered products using an EJS template
    res.status(200).render("products", { products , user: req.user });
  } catch (error) {
    req.flash("error_msg", "Unexpected error occurred", error.message);
    res.redirect("back");
  }
};

// Get my products as a vendor
exports.getMyProducts = async (req, res) => {
  try {
    const vendorId = req.user._id;

    const products = await Product.find({ vendor: vendorId });

    res.render("my-products", { products, user: req.user });
  } catch (error) {
    req.flash("error_msg", "Unexpected error occurred", error.message);
    res.redirect("back");
  }
};

exports.getProductById = async (req, res) => {
  try {
    // Get the product ID from the URL parameters
    const productId = req.params.id;

    // Find the product by ID in the database
    const product = await Product.findById(productId);

    if (!product) {
      // If the product is not found, render the error page with a message
      return res.status(404).render("error", { message: "Product not found" });
    }

    // Render the product details using the EJS template
    res.render("productDetails", { product });
  } catch (error) {
    req.flash("error_msg", "Unexpected error occurred", error.message);
    res.redirect("back");
  }
};
