const express = require('express');
const router = express.Router();

const { getImages, postImage, getAnImage, deleteImage } = require('../controllers');

router.route('/photos')
  .get(getImages)
  .post(postImage);

router.route('/photos/:photoid')
  .get(getAnImage)
  .put()
  .delete(deleteImage);

module.exports = router;
