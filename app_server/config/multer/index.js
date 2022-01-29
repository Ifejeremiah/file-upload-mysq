const multer = require('multer');
const path = require('path');

// Set the Storage Engine
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../../public/uploads/images'),
  filename: (req, file, callback) => {
    callback(null, doRenameToDate());
  }
})

// Return string to rename file
const doRenameToDate = () => {
  const now = new Date();
  return `Starhub Image ${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} at ${now.getHours()}.${now.getMinutes()}.${now.getSeconds()}.jpeg`;
}

// Check file type middleware
const checkFileType = (file, callback) => {

  // Allowed extnames
  const fileTypes = /jpeg|jpg|png|gif/;

  // Check extname
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

  // Check mime
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return callback(null, true);
  } else {
    return callback('Error:Images only');
  }

}

module.exports = multer({
  storage,
  fileFilter: (req, file, callback) => { checkFileType(file, callback) },
  limits: { fileSize: 10000000 }
}).single('uploadfile');