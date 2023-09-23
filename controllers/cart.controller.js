const db = require("../models/init");
const Cart = db.cart;

exports.addToCart = async (req, res) => {
    const { name, price, image, quantity } = req.body;
    try {
        // Check if the item already exists in the cart
        const existingCartItem = await CartItem.findOne({ name });

        if (existingCartItem) {
        // Increment the quantity if the item exists
        existingCartItem.quantity += 1;
        await existingCartItem.save();
        } else {
        // Create a new cart item if it doesn't exist
        const cartItem = new CartItem({ name, price, image, quantity, customer: req.user._id});
        await cartItem.save();
        }
        req.flash("success_msg", `Added to Cart successfully`);
        res.redirect('/products');
    } catch (error) {
        req.flash("error_msg", "Unexpected error occurred", error.message);
        res.redirect("back");
    }
};

exports.getMyCart = async (req, res) => {
    try {
      const customerId = req.user._id;
  
      const cart = await Cart.find({ customer: customerId });
  
      res.render("shoppingCart", { cart, user: req.user });
    } catch (error) {
      req.flash("error_msg", "Unexpected error occurred", error.message);
      res.redirect("back");
    }
  };