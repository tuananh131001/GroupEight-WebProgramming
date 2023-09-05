const express = require("express");
require("dotenv").config();

const app = express();
const mongoose = require("mongoose");
const db = require("./app/models/init");

app.use(express.json());

require("./app/routes/auth.routes")(app);
require("./app/routes/product.routes")(app);

mongoose
  .connect(db.mongoDBUrl)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});