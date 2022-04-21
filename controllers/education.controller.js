const Country = require('../models/Country');
const Education = require('../models/Education');
const University = require('../models/University');
const User = require('../models/User');
const validateEducation = require('../validation/education.validation');

/**
 * @method GET
 * @description Method to get all the educations from database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const index = async (req, res) => {
  try {
    const eductations = await Education.find();

    return res.status(200).json({
      success : true,
      message : "Fetched successfully",
      eductations : eductations,
    })
  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 * @method POST
 * @description Method to store new education in database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const create = async (req, res) => {
  const {error, value} = validateEducation(req.body);

  if (!error) return res.status(400).json(error.details);
    

  try {
    const user = await User.findById(value.userId);
    if (!user) {
      return res.status(404).json({
        error : true,
        message : 'User may not exist',
      });
    }
    const university = await University.findById(value.universityId);
    if (!university) {
      return res.status(404).json({
        error : true,
        message : "University may not exist",
      });
    }
    const country = await Country.findById(value.countryId);
    if (!country) {
      return res.status(404).json({
        error : true,
        message : "Country may not exist"
      })
    }

    const education = await Education.create(value);
    if (!education) {
      return res.status(501).json({
        error : true,
        message : "Something went wrong",
      })
      
    }

    return res.status(201).json({
      success : true,
      message : 'Created successfully',
    });
  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 * @method GET
 * @description Method to get a single education in database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const show = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({
        error : true,
        message : "Education may not exist",
      })
    }

    return res.status(200).json({
      success : true,
      message : 'Fetched successfully',
      education : education,
    })
  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 * @method PUT
 * @description Method to update an education
 * 
 * @param {*} req 
 * @param {*} res 
 */
const update = async (req, res) => {
  const {error, value} = validateEducation(req.body);

  if (!error) return res.status(400).json(error);

  try {
    const user = await User.findById(value.userId);
    if (!user) {
      return res.status(404).json({
        error : true,
        message : 'User may not exist',
      });
    }
    const university = await University.findById(value.universityId);
    if (!university) {
      return res.status(404).json({
        error : true,
        message : "University may not exist",
      });
    }
    const country = await Country.findById(value.countryId);
    if (!country) {
      return res.status(404).json({
        error : true,
        message : "Country may not exist"
      })
    }

    const education = await Education.findByIdAndUpdate(req.params.id, value);

    if (!education) {
      return res.status(501).json({
        error : true,
        message : "Education may not exist",
      }) 
    }

    return res.status(202).json({
      success : true,
      message : 'Education updated successfully',
    })
  
  } catch (error) {
    return res.status(501).json(error);
  }

}

/**
 * @method DELETE
 * @description Method to delete an education
 * 
 * @param {*} req 
 * @param {*} res 
 */
const destroy = async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) {
      res.status(404).json({
        error : true,
        message : "Education may not exist",
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

module.exports = { index, show, create, update, destroy };