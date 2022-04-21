const express = require('express');
const multer = require('multer');
const randomstring = require('randomstring');
const { index, create, show, update, destroy, uploadImage, subjects, getSubject } = require('../controllers/department.controller');

const DepartmentRouter = express.Router();

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

DepartmentRouter.get('/', index);
DepartmentRouter.post('/', upload.single('image'), create);
DepartmentRouter.get('/:id', show);
DepartmentRouter.put('/:id', upload.single('image'), update);
DepartmentRouter.delete('/:id', destroy);
DepartmentRouter.post("/:id/image", upload.single('image'), uploadImage);
DepartmentRouter.get("/:id/subjects", subjects);
DepartmentRouter.get('/:id/subjects/:subjectId', getSubject);

module.exports = DepartmentRouter;