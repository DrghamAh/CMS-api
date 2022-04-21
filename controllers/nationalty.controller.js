const Nationalty = require('../models/nationalty');
const validateNationalty = require('../validation/nationalty.validation');


/**
 * @method GET
 * @description Method to get all the nationalties from the database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const index = async (req, res) => {
  try {
    const nationalties = await Nationalty.find();
    
    return res.status(200).json({
      success : true,
      message : 'fetched successfully',
      nationalties : nationalties,
    });
    
  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 * @method POST
 * @description Method to store new nationalty in the database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const create = async (req, res) => {
  const {error, value} = validateNationalty(req.body);

  if (error) return res.status(400).json(error.details);

  try {
    const nationalty = await Nationalty.create(value);
    if (nationalty) {
      return res.status(201).json({
        success : true,
        message : 'Created successfully',
        nationalty : nationalty,
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
 * @description Method to get a single nationalty from the database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const show = async (req, res) => {
  try {
    const nationalty = await Nationalty.findById(req.params.id);
    if (!nationalty) {
      return res.status(404).json({
        error : true,
        message : 'nationalty may not exist',
      })
    }

    return res.status(200).json({
      success : true,
      message : 'fetched successfully',
      nationalty : nationalty,
    });
  } catch (error) {
    res.status(501).json(error);
  }
}

/**
 * @method PUT
 * @description Method to update a single nationalty in the database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const update = async (req, res) => {
  const {error, value} = validateNationalty(req.body);

  if (error) return res.status(400).json(error.details);

  try {
    const nationalty = await Nationalty.findByIdAndUpdate(req.params.id, value)

    if (!nationalty) {
      return res.status(404).json({
        error : true,
        message : 'nationalty may not exist',
      })
    }

    return res.status(202).json({
      success : true,
      message : 'Updated successfully',
      nationalty : nationalty,
    });
  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 * @method DELETE
 * @description Method to get delete a single nationalty from the database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const destroy = async (req, res) => {
  try {
    const nationalty = await Nationalty.findByIdAndDelete(req.params.id);

    if (!nationalty) {
      return res.status(404).json({
        error : true,
        message : 'nationalty may not exist',
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
