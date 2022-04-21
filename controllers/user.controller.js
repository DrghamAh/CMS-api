const User = require('../models/User');
const validateUser = require('../validation/user.validation');
const UserSchema = require('../validation/user.validation');

/**
 * @method GET
 * @description Method to get all users
 * 
 * @param {*} req 
 * @param {*} res 
 */
const index = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      success : true,
      message : 'Fetched successfully',
      users : users,
    });
  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 * @method POST
 * @description Method to store new user in database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const create = async (req, res) => {
  const {error, value} = validateUser(req.body);

  if (error) return res.status(400).json(error.details);

  try {
    const user = await User.create(value);
    
    if (!user) {
      return res.status(501).json({
        error : true,
        message : 'Something went wrong',
      });
    }

    return res.status(201).json({
      success : true,
      message : "Created Successfully",
      user : user,
    });
  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 * @method GET
 * @description Method to get a single user from database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const show = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        error : true,
        message : 'User may not exist',
      }); 
    }

    return res.status(200).json({
      success : true,
      message : 'Fethced Successfully',
      user : user,
    });
  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 * @method PUT
 * @description Method to update a single user inforamtion
 * 
 * @param {*} req 
 * @param {*} res 
 */
const update = async (req, res) => {
  const {error, value} = validateUser(req.body);

  if (error) return res.status(401).json(error);

  try {
    const user = await User.findByIdAndUpdate(req.params.id, value);
    
    if (!user) {
      return res.status(404).json({
        error : true,
        message : 'User may not exist',
      })
    }

    return res.status(202).json({
      success : true,
      message : 'Updated successfully',
      user : user,
    })
  } catch (error) {
    return res.status(501).json(error);
  }

}

/**
 * @method DELETE
 * @description Method to delete a single user from database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const destroy = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        error : true,
        message : 'User may not exist',
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

/**
 * @method PATCH
 * @description Method to upload user image
 * 
 * @param {*} req 
 * @param {*} res 
 */
const uploadImage = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.image = req.file.filename;
    }

    res.status(404).json({error : 'User may not exist'});
  } catch (error) {
    res.status(501).json(error);
  }
}

const admins = async (req, res) => {
  try {
    const admins = await User.find({role : 'a'});
    return res.status(200).json({
      success : true,
      message : "Fetched successfully",
      admins : admins,
    })
  } catch (error) {
    return res.status(501).json(error);
  }
}

const profesors = async (req, res) => {
  try {
    const profesors = await User.find({role : 'p'});
    return res.status(200).json({
      success : true,
      message : 'Fetched successfully',
      profesors : profesors,
    });
  } catch (error) {
    return res.status(501).json(error);
  }
}

const students = async (req, res) => {
  try {
    const students = await User.find({role : 's'});
    return res.status(200).json({
      success : true,
      message : 'Fetched successfully',
      students : students,
    })
  } catch (error) {
    return res.status(501).json(error)
  }
}

module.exports = { index, create, show, update, destroy, uploadImage, admins, profesors, students };