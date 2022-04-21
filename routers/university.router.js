const express = require('express');
const { index, create, show, update, destroy } = require('../controllers/university.controller');

const UniversityRouter = express.Router();

UniversityRouter.get('/', index);
UniversityRouter.post('/', create);
UniversityRouter.get('/:id', show);
UniversityRouter.put('/:id', update);
UniversityRouter.delete('/:id', destroy);

module.exports = UniversityRouter;