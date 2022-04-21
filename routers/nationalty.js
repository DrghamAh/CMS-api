const express = require('express');
const {index, create, show, update, destroy} = require('../controllers/nationalty.controller')

const NationaltyRouter = express.Router();

NationaltyRouter.get('/', index);
NationaltyRouter.post('/', create);
NationaltyRouter.get('/:id', show);
NationaltyRouter.put('/:id', update);
NationaltyRouter.delete('/:id', destroy);

module.exports = NationaltyRouter;