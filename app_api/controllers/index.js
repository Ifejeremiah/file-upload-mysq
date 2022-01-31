const connection = require('../models');
const mostRecentFirst = require('../config/most-recent-first');


const getImages = (req, res) => {
  const sql = `SELECT * FROM images`;

  connection.query(sql, (err, images) => {
    if (err) console.log(err);
    return res.status(200).json(mostRecentFirst(images));
  });
}

const getAnImage = (req, res) => {
  const { photoid } = req.params;
  const sql = `SELECT * FROM images WHERE id='${photoid}'`;

  connection.query(sql, (err, results) => {
    if (err) console.log(err);

    if (results.length) {
      let photo;

      results.forEach(result => {
        photo = {
          id: result.id,
          image_name: result.image_name
        }
      });
      return res.status(200).json(photo);
    } else {
      return res.status(404).json({ error: 'could not find image' });
    }
  });
}

const postImage = (req, res) => {
  const { filename } = req.body;

  if (!filename) {
    return res.status(400).json({ error: 'image required' });
  }

  // Make id a random text using crypto module
  const random = require('crypto').randomBytes(12).toString('hex');

  const postbody = { id: `${random}`, image_name: filename, };
  const sql = `INSERT INTO images SET ?`;

  connection.query(sql, postbody, (err) => {
    if (err) console.log(err);
    return res.status(200).json({ msg: 'image uploaded' });
  });
}

const deleteImage = (req, res) => {
  const { photoid } = req.params;

  if (!photoid) {
    return res.status(400).json({ error: 'no image specified' });
  }

  const sql = `SELECT * FROM images WHERE id='${photoid}'`;

  connection.query(sql, (err, results) => {
    if (err) console.log(err);
    if (results.length) {
      let photo;

      results.forEach(result => {
        photo = {
          image_name: result.image_name
        }
      });

      const sql = `DELETE FROM images WHERE id = '${photoid}';`;

      connection.query(sql, (err) => {
        if (err) console.log(err);
        return res.status(200).json(photo);
      });
    } else {
      return res.status(404).json({ error: 'could not find image' });
    }
  });
}


module.exports = {
  getImages,
  getAnImage,
  postImage,
  deleteImage
}