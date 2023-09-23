/* <!-- // RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023B
// Assessment: Full-stack Web Application
// Author: Team Eight
// Acknowledgement: Google , Stackoverflow, w3schools --> */

const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

module.exports = upload;
