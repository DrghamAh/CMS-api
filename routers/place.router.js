const express = require('express');
const {index, create, show, update, destroy} = require('../controllers/place.controller');

const PlaceRouter = express.Router();

PlaceRouter.get('/', index);
PlaceRouter.post('/', create);
PlaceRouter.get('/:id', show);
PlaceRouter.put('/:id', update);
PlaceRouter.delete('/:id', destroy);

module.exports = PlaceRouter;