const express = require('express');
const multer = require('multer');
const randomstring = require('randomstring');
const {index, create, show, update, destroy, uploadImage, admins, profesors, students} = require('../controllers/user.controller');

const UserRouter = express.Router();

const storage = multer.diskStorage({
  destination : (req, file, callback) => {
    callback(null, './public/images/departments');
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
      file.mimetype !== 'image/jpeg' ||
      file.mimetype !== 'image/png'  ||
      file.mimetype !== 'image/jpg'
    ) {
      callback(null, true)
    } else {
      callback(null, false);
    }
  }
});

UserRouter.get('/', index);
UserRouter.get('/admins', admins);
UserRouter.get('/profesors', profesors);
UserRouter.get('/students', students);
UserRouter.post('/', create);
UserRouter.get('/:id', show);
UserRouter.put('/:id', update);
UserRouter.delete('/:id', destroy);
UserRouter.patch('/:id/image', upload.single('image'), uploadImage);

module.exports = UserRouter;