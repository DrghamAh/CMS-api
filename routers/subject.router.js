const express = require('express');
const multer = require('multer');
const randomstring = require('randomstring');
const { index, create, show, update, destroy, uploadImage, department, exams, getSubjectsByStudyYear } = require('../controllers/subject.controller');

const SubjectRouter = express.Router();


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

SubjectRouter.get('/', index);
SubjectRouter.post('/', create);
SubjectRouter.get('/:id', show);
SubjectRouter.put('/:id', update);
SubjectRouter.delete('/:id', destroy);
SubjectRouter.patch('/:id/image', upload.single('image'), uploadImage);
SubjectRouter.get('/:id/department', department);
SubjectRouter.get('/:id/exams', exams);
SubjectRouter.get('/:year', getSubjectsByStudyYear);

module.exports = SubjectRouter;