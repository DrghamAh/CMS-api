const express = require('express');
const {index, create, show, update, destroy} = require('../controllers/country.controller')

const CountryRouter = express.Router();

CountryRouter.get('/', index);
CountryRouter.post('/', create);
CountryRouter.get('/:id', show);
CountryRouter.put('/:id', update);
CountryRouter.delete('/:id', destroy);

module.exports = CountryRouter;