const express = require('express');
const { index, create, show, update, destroy } = require('../controllers/education.controller');

const EducationRouter = express.Router();

EducationRouter.get('/', index);
EducationRouter.post('/', create);
EducationRouter.get('/:id', show);
EducationRouter.put('/:id', update);
EducationRouter.delete('/:id', destroy);

module.exports = EducationRouter;