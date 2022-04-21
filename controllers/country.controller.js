const Country = require('../models/Country');
const validateCountry = require('../validation/country.vallidation');


/**
 * @method GET
 * @description Method to get all the countries from the database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const index = async (req, res) => {
  try {
    const countries = await Country.find();
    
    return res.status(200).json({
      success : true,
      message : 'fetched successfully',
      countries : countries,
    });
    
  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 * @method POST
 * @description Method to store new country in the database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const create = async (req, res) => {
  const {error, value} = validateCountry(req.body);

  if (error) return res.status(400).json(error.details);

  try {
    const country = await Country.create(value);
    if (country) {
      return res.status(201).json({
        success : true,
        message : 'Created successfully',
        country : country,
      })
    }
    return res.status(501).json({
      error : true,
      message : 'Something went wrong',
    })
    
  } catch (error) {
    return req.status(501).json(error);
  }
}

/**
 * @method GET
 * @description Method to get a single country from the database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const show = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) {
      return res.status(404).json({
        error : true,
        message : 'Country may not exist',
      })
    }

    return res.status(200).json({
      success : true,
      message : 'fetched successfully',
      country : country,
    });
  } catch (error) {
    res.status(501).json(error);
  }
}

/**
 * @method PUT
 * @description Method to update a single country in the database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const update = async (req, res) => {
  const {error, value} = validateCountry(req.body);

  if (error) return res.status(400).json(error.details);

  try {
    const country = await Country.findByIdAndUpdate(req.params.id, value)

    if (!country) {
      return res.status(404).json({
        error : true,
        message : 'Country may not exist',
      })
    }

    return res.status(202).json({
      success : true,
      message : 'Updated successfully',
      country : country,
    });
  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 * @method DELETE
 * @description Method to get delete a single country from the database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const destroy = async (req, res) => {
  try {
    const country = await Country.findByIdAndDelete(req.params.id);

    if (!country) {
      return res.status(404).json({
        error : true,
        message : 'country may not exist',
      });
    }
    return res.status(202).json({
      success : true,
      message : 'Deleted successfully',
    });
  } catch (error) {
    return res.status(501).json(error);
  }
}

module.exports = { index, create, show, update, destroy };
