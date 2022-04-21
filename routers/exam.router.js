const express = require('express');
const { index, create, show, update, destroy } = require('../controllers/exam.controller');

const ExamRouter = express.Router();

ExamRouter.get('/', index);
ExamRouter.post('/', create);
ExamRouter.get('/:id', show);
ExamRouter.put('/:id', update);
ExamRouter.delete('/:id', destroy);

module.exports = ExamRouter;