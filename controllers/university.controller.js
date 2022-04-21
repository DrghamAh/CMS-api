const { response } = require('express');
const Country = require('../models/Country');
const University = require('../models/University');
const validateUniversity = require('../validation/university.validation');
const UniversitySchema = require('../validation/university.validation');

/**
 * @method GET
 * @description Method to get all univerisities from database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const index = async (req, res) => {
  try {
    const universities = await University.find();

    return res.status(200).json({
      success : true,
      message : "Fetched Successfully",
      universities : universities,
    });
  } catch (error) {
    res.status(501).json(error);
  }
}

/**
 * @method POST
 * @description Method to store new university in database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const create = async (req, res) => {
  const {error, value} = validateUniversity(req.body);

  if (error) return res.status(400).json(error.details);

  try {
    const country = await Country.findById(value.countryId);

    if (!country) {
      return res.status(404).json({
        error : true,
        message : 'the country is not exist',
      })
    }

    const university = await University.create(value);

    return res.status(201).json({
      success : true,
      message : 'Created successfully',
      university : university,
    });
    
  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 * @method GET
 * @description Method to get a single record from database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const show = async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({
        error : true,
        message : 'University may not exist',
      });
    }

    return res.status(200).json({
      success : true,
      message : 'Fetched successfully',
      university : university,
    });
  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 * @method PUT
 * @description Method to update univsersity in database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const update = async (req, res) => {
  const {error, value} = validateUniversity(req.body);

  if (error) return res.status(400).json(error.details);

  try {
    const country = await Country.findById(value.countryId);

    if (!country) {
      return res.status(404).json({
        error : true,
        message : "Country may not exist",
      })
    }

    const university = await University.findByIdAndUpdate(req.params.id, value);

    if (!university) {
      return res.status(404).json({
        error : true,
        message : 'University may not exist',
      })
    }

    return res.status(202).json({
      success : true,
      message : 'Updated successfully',
    });
  } catch (error) {
    return res.status(501).json(error)
  }
}

/**
 * @method DELETE
 * @description Method to delete university from database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const destroy = async (req, res) => {
  try {
    const university = await University.findByIdAndDelete(req.params.id);
    if (!university) {
      return res.status(404).json({
        error : true,
        message : "University may not exist",
      })
    }

    return res.status(202).json({
      success : true,
      message : 'Deleted successfully',
    });
  } catch (error) {
    return res.status(501).json(error);
  }
}

module.exports = { index, create, update, show, destroy };