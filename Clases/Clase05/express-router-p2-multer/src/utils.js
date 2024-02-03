const multer = require('multer') 
const path = require('path') //libreria que maneja las rutas

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(`${__dirname}/public/uploads/`));
    },
    filename: function (req, file, cb) {
      console.log("🚀 ~ file:", file);
      cb(null, `${Date.now()}-${file.originalname}`);
    },
});
//cb: callback
  
const uploader = multer({
  storage,
  onError: function (err, next) {
      console.log("🚀 ~ err:", err);
      next();
  },
});

module.exports = {
  uploader,
};