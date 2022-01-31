const express = require('express');
const router = express.Router();

const { homepage, postImages, getImages, getAnImage, deleteImage } = require('../controllers');

router.route('/')
  .get(homepage)
  .post(postImages);

  router.get('/photos', getImages);

  router.get('/photos/:photoid', getAnImage);

  router.get('/photos/:photoid/delete', deleteImage);

module.exports = router;
