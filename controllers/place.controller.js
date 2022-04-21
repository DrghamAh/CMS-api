const Place = require('../models/Place');
const validatePlace = require('../validation/place.validation');

/**
 * @method GET
 * @description Method to get all places
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns Response
 */
const index = async (req, res) => {
  try {
    const places = await Place.find();
    return res.status(200).json({
      success : true,
      message : 'Fetched successfully',
      places : places,
    })
  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 * @method POST
 * @description Method to create new place
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns Response
 */
const create = async (req, res) => {
  const {error, value} = validatePlace(req.body);

  if (error) return res.status(400).json(error.details);

  try {
    const place = await Place.create(value);
    return res.status(201).json({
      success : true,
      message : 'Created successfully',
      place : place,
    })
  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 * @method GET
 * @description Method to get a single place
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns Response
 */
const show = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({
        error : true,
        message : "Place may not exist"
      })
    }
    return res.status(200).json({
      success : true,
      message : 'Fetched successfully',
      place : place,
    })
  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 * @method PUT
 * @description method to update a one place
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns Response
 */
const update = async (req, res) => {
  const {error, value} = validatePlace(req.body);

  if (error) return res.status(400).json(error.details);

  try {
    const place = await Place.findByIdAndUpdate(req.params.id, value);
    if (!place) {
      return res.status(404).json({
        error : true,
        message : 'Place may not exist',
      })
    }
    return res.status(202).json({
      success : true,
      message : "Updated successfully",
      place : place,
    })
  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 * @method DELETE
 * @description Method to delete a on place from database
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const destroy = async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);
    if (!place) {
      return res.status(404).json({
        error : true,
        message : 'Place may not exist',
      })
    }
    return res.status(202).json({
      success : true,
      message : "Deleted successfully",
    })
  } catch (error) {
    return res.status(501).json(error);
  }
}

module.exports = {index, show, create, update, destroy};