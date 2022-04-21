const Collage = require('../models/Collage');
const University = require('../models/University');
const validateCollage = require('../validation/collage.validation');

/**
 * @method GET
 * @description Method to get all collages from database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const index = async (req, res) => {
  try {
    const collages = await Collage.find();
    return res.status(200).json({
      success : true,
      message : "Fetched successfully",
      collages : collages
    });
  } catch (error) {
    return res.status(501).json(error);
  }
}


/**
 * @method POST
 * @description method to store new collage in database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const create = async (req, res) => {
  const {error, value} = validateCollage(req.body);

  if (error) return res.status(400).json(error.details);

  try {
    const university = await University.findById(value.collageId);

    if (!university) {
      return res.status(404).json({
        error : true,
        message : 'University may not exist',
      })
    }

    const collage = await Collage.create(value);
    return res.status(201).json({
      sussess : true,
      message : 'collage created successfully',
      collage : collage,
    });

  } catch (error) {
    return res.status(501).json(error);
  }
  
}

/**
 * @method GET
 * @description Method to get a single collage from database
 * @param {*} req 
 * @param {*} res 
 */
const show = async (req, res) => {
  try {
    const collage = await Collage.findById(req.params.id);
    if (!collage) {
      res.status(404).json({
        error : true,
        message : 'collage My not exist',
      }); 
    }

    return res.status(201).json({
      success : true,
      message : 'collage fetched successfully',
      collage : collage,
    });
  } catch (error) {
    res.status(501).json(error);
  }
}

/**
 * @method PUT
 * @description Method to update a single collage by its id
 * 
 * @param {*} req 
 * @param {*} res 
 */
const update = async (req, res) => {
  const {error, value} = validateCollage(req.body);

  if (error) return res.status(400).json(error.details);
  
  try {
    const university = await University.findById(value.universityId);

    if (!university) {
      return res.status(404).json({
        error : true,
        message : 'University may not exist',
      })
    }

    const collage = await Collage.findByIdAndUpdate(req.params.id, value);

    if (!collage) {
      return res.status(404).json({
        error : true,
        message : 'Could not update the collage',
      }); 
    }

    return res.status(202).json({
      success : true,
      message : 'collage updated successfully',
      collage : collage,
    });
  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 * @method DELETE
 * @description Method to delete a single collage
 * 
 * @param {*} req 
 * @param {*} res 
 * @
 */
const destroy = async (req, res) => {
  try {
    const collage = await Collage.findByIdAndDelete(req.params.id);

    if (!collage) {
      return res.status(404).json({
        error : true,
        message : 'collage may not exist',
      });
    } 

    return res.status(202).json({
      success : true,
      message : 'collage deleted successfully',
    });
  } catch (error) {
    return res.status(501).json(error);
  }
}

module.exports = { index, create, show, update, destroy }