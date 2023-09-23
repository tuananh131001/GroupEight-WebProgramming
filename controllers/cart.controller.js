const db = require("../models/init");
const Cart = db.cart;

exports.addToCart = async (req, res) => {
  const { name, price, image, quantity, productId } = req.body;
  try {
    // Check if the item already exists in the cart
    const existingCartItem = await Cart.findOne({ name });

    if (existingCartItem) {
      // Increment the quantity if the item exists
      existingCartItem.quantity += 1;
      await existingCartItem.save();
    } else {
      // Create a new cart item if it doesn't exist
      const cartItem = new Cart({
        productId,
        name,
        price,
        image,
        quantity,
        customer: req.user._id,
      });
      await cartItem.save();
    }
    req.flash("success_msg", `Added to Cart successfully`);
    res.redirect("/");
  } catch (error) {
    req.flash("error_msg", "Unexpected error occurred", error.message);
    res.redirect("back");
  }
};

exports.getMyCart = async (req, res) => {
  try {
    const customerId = req.user._id;

    const carts = await Cart.find({ customer: customerId });

    // calculate total price
    let totalPrice = 0;
    carts.forEach((cart) => {
      totalPrice += cart.price;
    });

    res.render("shoppingCart", { carts, totalPrice });
  } catch (error) {
    req.flash("error_msg", "Unexpected error occurred", error.message);
    res.redirect("back");
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const cartId = req.params.id;
    await Cart.findByIdAndDelete(cartId);
    req.flash("success_msg", "Cart deleted successfully");
    res.redirect("/carts");
  } catch (error) {
    req.flash("error_msg", "Unexpected error occurred", error.message);
    res.redirect("back");
  }
};
