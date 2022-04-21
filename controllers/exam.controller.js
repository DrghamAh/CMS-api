const Exam = require('../models/exam');
const Subject = require('../models/Subject');
const validateExam = require('../validation/exam.validation');

/**
 * @method GET
 * @description Method to get all exams from database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const index = async (req, res) => {
  try {
    const exams = await Exam.find();
    return res.status(200).json({
      success : true,
      message : "Fetched successfully",
      exams : exams
    });
  } catch (error) {
    return res.status(501).json(error);
  }
}


/**
 * @method POST
 * @description method to store new exam in database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const create = async (req, res) => {
  const {error, value} = validateExam(req.body);

  if (error) return res.status(400).json(error.details);

  try {
    const subject = await Subject.findById(value.examId);

    if (!subject) {
      return res.status(404).json({
        error : true,
        message : 'subject may not exist',
      })
    }

    const exam = await Exam.create(value);
    return res.status(201).json({
      sussess : true,
      message : 'exam created successfully',
      exam : exam,
    });

  } catch (error) {
    return res.status(501).json(error);
  }
  
}

/**
 * @method GET
 * @description Method to get a single exam from database
 * @param {*} req 
 * @param {*} res 
 */
const show = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      res.status(404).json({
        error : true,
        message : 'exam My not exist',
      }); 
    }

    return res.status(200).json({
      success : true,
      message : 'exam fetched successfully',
      exam : exam,
    });
  } catch (error) {
    res.status(501).json(error);
  }
}

/**
 * @method PUT
 * @description Method to update a single exam by its id
 * 
 * @param {*} req 
 * @param {*} res 
 */
const update = async (req, res) => {
  const {error, value} = validateExam(req.body);

  if (error) return res.status(400).json(error.details);
  
  try {
    const subject = await Subject.findById(value.subjectId);

    if (!subject) {
      return res.status(404).json({
        error : true,
        message : 'subject may not exist',
      })
    }

    const exam = await Exam.findByIdAndUpdate(req.params.id, value);

    if (!exam) {
      return res.status(404).json({
        error : true,
        message : 'Could not update the exam',
      }); 
    }

    return res.status(202).json({
      success : true,
      message : 'exam updated successfully',
      exam : exam,
    });
  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 * @method DELETE
 * @description Method to delete a single exam
 * 
 * @param {*} req 
 * @param {*} res 
 * @
 */
const destroy = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);

    if (!exam) {
      return res.status(404).json({
        error : true,
        message : 'exam may not exist',
      });
    } 

    return res.status(202).json({
      success : true,
      message : 'exam deleted successfully',
    });
  } catch (error) {
    return res.status(501).json(error);
  }
}

module.exports = { index, create, show, update, destroy }