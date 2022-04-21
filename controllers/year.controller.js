const Year = require('../models/Year');
const Collage = require('../models/Collage');
const validateYear = require('../validation/year.validation');
const Department = require('../models/Department');

/**
 * @method GET
 * @description Method to get all years from database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const index = async (req, res) => {
  try {
    const years = await Year.find();
    return res.status(200).json({
      success : true,
      message : "Fetched successfully",
      years : years
    });
  } catch (error) {
    return res.status(501).json(error);
  }
}


/**
 * @method POST
 * @description method to store new year in database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const create = async (req, res) => {
  const {error, value} = validateYear(req.body);

  if (error) return res.status(400).json(error.details);

  try {
    const collage = Collage.findById(value.yearId);
    if (!collage) {
      return res.status(404).json({
        error : true,
        message : 'Collage may not exist',
      })
    }

    const department = Department.findById(value.departmentId);
    if (!department) {
      return res.status(404).json({
        error : true,
        message : "Department may not exist",
      })
    }

    const year = await Year.create(value);
    return res.status(201).json({
      sussess : true,
      message : 'year created successfully',
      year : year,
    });

  } catch (error) {
    return res.status(501).json(error);
  }
  
}

/**
 * @method GET
 * @description Method to get a single year from database
 * @param {*} req 
 * @param {*} res 
 */
const show = async (req, res) => {
  try {
    const year = await Year.findById(req.params.id);
    if (!year) {
      res.status(404).json({
        error : true,
        message : 'year My not exist',
      }); 
    }

    return res.status(201).json({
      success : true,
      message : 'year fetched successfully',
      year : year,
    });
  } catch (error) {
    res.status(501).json(error);
  }
}

/**
 * @method PUT
 * @description Method to update a single year by its id
 * 
 * @param {*} req 
 * @param {*} res 
 */
const update = async (req, res) => {
  const {error, value} = validateYear(req.body);

  if (error) return res.status(400).json(error.details);
  
  try {
    const collage = Collage.findById(value.collageId);
    if (!collage) {
      return res.status(404).json({
        error : true,
        message : 'collage may not exist',
      })
    }

    const department = Department.findById(value.departmentId);
    if (!department) {
      return res.status(404).json({
        error : true,
        message : "Department may not exist",
      })
    }

    const year = await Year.findByIdAndUpdate(req.params.id, value);

    if (!year) {
      return res.status(404).json({
        error : true,
        message : 'Could not update the year',
      }); 
    }

    return res.status(202).json({
      success : true,
      message : 'year updated successfully',
      year : year,
    });
  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 * @method DELETE
 * @description Method to delete a single year
 * 
 * @param {*} req 
 * @param {*} res 
 * @
 */
const destroy = async (req, res) => {
  try {
    const year = await Year.findByIdAndDelete(req.params.id);

    if (!year) {
      return res.status(404).json({
        error : true,
        message : 'year may not exist',
      });
    } 

    return res.status(202).json({
      success : true,
      message : 'year deleted successfully',
    });
  } catch (error) {
    return res.status(501).json(error);
  }
}

module.exports = { index, create, show, update, destroy }