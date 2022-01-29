const express = require('express');
const router = express.Router();

const { homepage, postImages, getImages } = require('../controllers');

router.route('/')
  .get(homepage)
  .post(postImages);

router.get('/photos', getImages);

module.exports = router;
