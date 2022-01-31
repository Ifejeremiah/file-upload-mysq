const fs = require('fs');
const path = require('path');

const upload = require('../config/multer');

const makeRequest = (path, method, callback, data) => {
  const apiOptions = {
    server: 'http://localhost:3000/api/'
  };

  if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://  .herokuapp.com/api/';
  };

  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: method ? method : 'GET',
    json: data ? data : {},
  };

  require('request')(
    requestOptions,
    (err, { statusCode }, body) => {
      if (err) console.log(err);
      if (statusCode === 200) {
        callback(body);
      }
    }
  );
}


const homepage = (req, res) => {
  res.render('home');
}

const getImages = (req, res) => {
  makeRequest('photos', false, (data) => {
    res.render('photos', { images: data });
  });
}

const getAnImage = (req, res) => {
  makeRequest(`photos/${req.params.photoid}`, false, (data) => {
    if (data) {
      res.render('photo-details', { image: data });
    } else {
      res.render('home', { msg: 'Image does not exist' });
    }
  });
}

const postImages = (req, res) => {
  upload(req, res, (err) => {
    const { file } = req;
    if (err) { res.render('home', { msg: err }) }

    if (file === undefined) {
      res.render('home', { msg: 'No file selected' })
    } else {

      const postbody = { filename: req.file.filename }
      makeRequest('photos', 'POST', () => {
        res.redirect('/photos');
      }, postbody);
    }
  });
}

const deleteImage = (req, res) => {
  const { photoid } = req.params;

  makeRequest(`photos/${photoid}`, 'DELETE', (data) => {
    console.log(data.image_name);

    const fileToDelete = path.join(__dirname, `../../public/uploads/images/${data.image_name}`);

    fs.unlink(fileToDelete, (err) => {
      if (err) console.log(err);
      res.redirect('/photos');
    });
  });

}

module.exports = {
  homepage,
  postImages,
  getImages,
  getAnImage,
  deleteImage
}