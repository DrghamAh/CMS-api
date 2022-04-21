const express = require('express');
const { index, create, show, update, destroy } = require('../controllers/collage.controller');

const CollageRouter = express.Router();

CollageRouter.get('/', index);
CollageRouter.post('/', create);
CollageRouter.get('/:id', show);
CollageRouter.put('/:id', update);
CollageRouter.delete('/:id', destroy);

module.exports = CollageRouter;