const connection = require('../models');
const upload = require('../config/multer');
const mostRecentFirst = require('../config/most-recent-first');


const homepage = (req, res) => {
  return res.render('home');
}

const postImages = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render('home', { msg: err });
    } else {
      if (req.file === undefined) {
        res.render('home', { msg: 'Error: no file selected' });
      } else {
        const postbody = { image_name: req.file.filename }
        const sql = `INSERT INTO images SET ?`;

        connection.query(sql, postbody, (err) => {
          if (err) console.log(err);
          return res.redirect('/');
        });
      }
    }
  });
}

const getImages = (req, res) => {
  const sql = `SELECT * FROM images`;

  connection.query(sql, (err, images) => {
    if (err) console.log(err);
    return res.render('photos', { images: mostRecentFirst(images) });
  });
}

module.exports = { homepage, postImages, getImages }