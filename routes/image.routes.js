// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023B
// Assessment: Full-stack Web Application
// Author: Team Eight
// Acknowledgement: Google , Stackoverflow, w3schools
const db = require("../models/init");
const Image = db.image;

module.exports = function (app) {
  app.get("/image/:id", async (req, res) => {
    const { id } = req.params;

    const image = await Image.findById(id);

    res.set("Content-Type", image.contentType);
    res.send(image.file);
  });
};
