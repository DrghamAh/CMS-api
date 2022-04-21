const multer = require('multer');
const randomstring = require('randomstring');

const imageUploader = (req, res, folder = 'courses') => {
  const storage = multer.diskStorage({
    destination : (req, file, callback) => {
      callback(null, `./public/images/${folder}`);
    },
    filename : (req, file, callback) => {
      const name = randomstring.generate(12) + Date.now() + '.' + file.mimetype.split('/')[1];
      callback(null, name);
    }
  });
  
  const upload = multer({
    storage : storage,
    fileFilter : (req, file, callback) => {
      if (
        file.mimetype === 'image/png'  || 
        file.mimetype === 'image/jpeg' || 
        file.mimetype === 'image/jpg'
      ) {
        callback(`Image type ${file.mimetype} is not correct`);
      } else {
        callback(null, true);
      }
    }
  }).single('image');

  upload(req, res, (err) => {
    if (err) return false;
    else return true;
  })
}

module.exports = { imageUploader }