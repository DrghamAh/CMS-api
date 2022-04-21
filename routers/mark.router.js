const express = require('express');
const {index, create, show, update, destroy} = require('../controllers/mark.controller');

const MarkRouter = express.Router();

MarkRouter.get('/', index);
MarkRouter.post('/', create);
MarkRouter.get('/:id', show);
MarkRouter.put('/:id', update);
MarkRouter.delete('/:id', destroy);

module.exports = MarkRouter;