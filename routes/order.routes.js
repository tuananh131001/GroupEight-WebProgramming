// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023B
// Assessment: Full-stack Web Application
// Author: Team Eight
// Acknowledgement: Google , Stackoverflow, w3schools
const db = require("../models/init");
const Order = db.order;
const Cart = db.cart;
const Product = db.product;
const Hub = db.hub;
const checkUserRole = require("../middleware/checkRole");

module.exports = function (app) {
  app.post("/order", checkUserRole("customer"), async (req, res) => {
    const hubs = await Hub.find({});
    const randomHub = hubs[Math.floor(Math.random() * hubs.length)];
    console.log("product", req.body.products)
    const newOrder = new Order({
      products: JSON.parse(req.body.products),
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

  app.get("/order/:id", checkUserRole("shipper"), async (req, res) => {
    const order = await Order.findById(req.params.id);
    console.log("order", order);

    res.render("order-detail", { order });
  });

  app.get("/shipper-orders", checkUserRole("shipper"), async (req, res) => {
    try {
      // Assuming the logged-in shipper's ID is saved in session
      const shipper = req.user;
      const orders = await Order.find({
        distributionHub: shipper.distributionHub,
        status: "active",
      });

      const deliveredOrders = await Order.find({
        distributionHub: shipper.distributionHub,
        status: "delivered",
      });
      console.log("orders", orders)

      res.render("shipper-orders", { orders: orders || null, deliveredOrders });
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }

    app.post(
      "/order/update/:orderId",
      checkUserRole("shipper"),
      async (req, res) => {
        try {
          await Order.findByIdAndUpdate(req.params.orderId, {
            status: req.body.status,
          });
          res.redirect("/shipper-orders");
        } catch (err) {
          res.status(500).send("Internal Server Error");
        }
      }
    );
  });
};
