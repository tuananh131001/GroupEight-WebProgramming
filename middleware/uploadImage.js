const multer = require("multer");
const path = require("path");
const { mongoDBUrl } = require("../config/db.config");
const { GridFsStorage } = require("multer-gridfs-storage");
const crypto = require('crypto');

const storage = new GridFsStorage({
  url: mongoDBUrl,
  file: (req, file) => {
      return new Promise((resolve, reject) => {
          crypto.randomBytes(16, (err, buf) => {
              if (err) {
                  return reject(err);
              }
              const filename = buf.toString('hex') + path.extname(file.originalname);
              const fileInfo = {
                  filename: filename,
                  bucketName: 'uploads'
              };
              resolve(fileInfo);
          });
      });
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
