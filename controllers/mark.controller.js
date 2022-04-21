const Exam = require('../models/exam');
const Mark = require('../models/Mark');
const User = require('../models/User');
const validateMark = require('../validation/mark.validation');

/**
 * @method GET
 * @description Method to get all the marks from database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const index = async (req, res) => {
  try {
    const marks = await Mark.find();

    return res.status(200).json({
      success : true,
      message : "Fetched successfully",
      marks : marks,
    })
  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 * @method POST
 * @description Method to store new mark in database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const create = async (req, res) => {
  const {error, value} = validateMark(req.body);

  if (!error) return res.status(400).json(error.details);
    

  try {
    const user = await User.findById(value.userId);
    if (!user) {
      return res.status(404).json({
        error : true,
        message : 'User may not exist',
      });
    }
    const exam = await Exam.findById(value.examId);
    if (!exam) {
      return res.status(404).json({
        error : true,
        message : "Exam may not exist",
      });
    }

    const mark = await mark.create(value);
    if (!mark) {
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
 * @description Method to get a single mark in database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const show = async (req, res) => {
  try {
    const mark = await Mark.findById(req.params.id);
    if (!mark) {
      return res.status(404).json({
        error : true,
        message : "mark may not exist",
      })
    }

    return res.status(200).json({
      success : true,
      message : 'Fetched successfully',
      mark : mark,
    })
  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 * @method PUT
 * @description Method to update an mark
 * 
 * @param {*} req 
 * @param {*} res 
 */
const update = async (req, res) => {
  const {error, value} = validateMark(req.body);

  if (!error) return res.status(400).json(error);

  try {
    const user = await User.findById(value.userId);
    if (!user) {
      return res.status(404).json({
        error : true,
        message : 'User may not exist',
      });
    }
    const exam = await Exam.findById(value.examId);
    if (!exam) {
      return res.status(404).json({
        error : true,
        message : "Exam may not exist",
      });
    }

    const mark = await Mark.findByIdAndUpdate(req.params.id, value);

    if (!mark) {
      return res.status(501).json({
        error : true,
        message : "mark may not exist",
      }) 
    }

    return res.status(202).json({
      success : true,
      message : 'mark updated successfully',
    })
  
  } catch (error) {
    return res.status(501).json(error);
  }

}

/**
 * @method DELETE
 * @description Method to delete an mark
 * 
 * @param {*} req 
 * @param {*} res 
 */
const destroy = async (req, res) => {
  try {
    const mark = await Mark.findByIdAndDelete(req.params.id);
    if (!mark) {
      res.status(404).json({
        error : true,
        message : "mark may not exist",
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