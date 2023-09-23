const db = require("../models/init");
const Order = db.order;
const Cart = db.cart;
const Hub = db.hub;

module.exports = function (app) {
  app.post("/order", async (req, res) => {
    const hubs = await Hub.find({});
    const randomHub = hubs[Math.floor(Math.random() * hubs.length)];



    const newOrder = new Order({
        products: req.body.products.productId,
        total: req.body.total,
        address: req.body.address,
        distributionHub: randomHub._id,
    });

    newOrder
      .save()
      .then(async () => {
        await Cart.deleteMany({ customer: req.user._id });
        req.flash("success_msg", `Order ${newOrder._id}  created successfully`);
        res.redirect("/carts");
      })
      .catch((error) => {
        req.flash("error_msg", error.message);
        res.redirect("back");
      });
  });
};
