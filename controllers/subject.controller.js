const Department = require('../models/Department');
const Exam = require('../models/exam');
const Subject = require('../models/Subject');
const User = require('../models/User');
const Year = require('../models/Year');
const validateSubject = require('../validation/subject.validation');


/**
 * @method GET
 * @description Method to get all subjects from database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const index = async (req, res) => {
  try {
    const subjects = await Subject.find();
    return res.status(200).json({
      success : true,
      message : "Fetched successfully",
      subjects : subjects
    });
  } catch (error) {
    return res.status(501).json(error);
  }
}


/**
 * @method POST
 * @description method to store new subject in database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const create = async (req, res) => {
  const {error, value} = validateSubject(req.body);

  if (error) return res.status(400).json(error.details);

  try {
    const department = Department.findById(value.departmentId);

    if (!department) {
      return res.status(404).json({
        error : true,
        message : 'University may not exist',
      })
    }

    const subject = await Subject.create(value);
    return res.status(201).json({
      sussess : true,
      message : 'subject created successfully',
      subject : subject,
    });

  } catch (error) {
    return res.status(501).json(error);
  }
  
}

/**
 * @method GET
 * @description Method to get a single subject from database
 * @param {*} req 
 * @param {*} res 
 */
const show = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      res.status(404).json({
        error : true,
        message : 'subject My not exist',
      }); 
    }

    return res.status(201).json({
      success : true,
      message : 'subject fetched successfully',
      subject : subject,
    });
  } catch (error) {
    res.status(501).json(error);
  }
}

/**
 * @method PUT
 * @description Method to update a single subject by its id
 * 
 * @param {*} req 
 * @param {*} res 
 */
const update = async (req, res) => {
  const {error, value} = validateSubject(req.body);

  if (error) return res.status(400).json(error.details);
  
  try {
    const profesore = await User.findById(value.profesorId);
    if (!profesore) {
      return res.status(404).json({
        error : true,
        message : 'Profesor may not exist',
      })
    }

    const department = Department.findById(value.departmentId);
    if (!department) {
      return res.status(404).json({
        error : true,
        message : 'Department may not exist',
      })
    }


    const subject = await Subject.findByIdAndUpdate(req.params.id, value);

    if (!subject) {
      return res.status(404).json({
        error : true,
        message : 'Could not update the subject',
      }); 
    }

    return res.status(202).json({
      success : true,
      message : 'subject updated successfully',
      subject : subject,
    });
  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 * @method DELETE
 * @description Method to delete a single subject
 * 
 * @param {*} req 
 * @param {*} res 
 * @
 */
const destroy = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);

    if (!subject) {
      return res.status(404).json({
        error : true,
        message : 'subject may not exist',
      });
    } 

    return res.status(202).json({
      success : true,
      message : 'subject deleted successfully',
    });
  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 * @method PATCH
 * @description Method to upload image for the subject
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns response
 */
const uploadImage = async (req, res) => {
  if (req.file) {
    return res.status(200).json({
      success : true,
      message : "Image uploaded successfully",
    });
  }
  return res.status(400).json({
    errro : true,
    message : "Image type does not match the requirements",
  })
}

/**
 * @method GET
 * @description Method to get the department subject
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns Response
 */
const department = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (subject) {
      const department = await Department.findById(subject.departmentId);
      if (department) {
        return res.status(200).json({
          success : true,
          message : 'Fetched successfully',
          department : department,
        })
      }
      return res.status(404).json({
        error : true,
        message : 'Department may not exist',
      })
    }
    return res.status(404).json({
      error : true,
      message : 'Subject may not exist',
    })
  } catch (error) {
    res.status(501).json(error);
  }
}

/**
 * @method GET
 * @description Method to get all subject's exmas
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns Response
 */
const exams = async (req, res) => {
  try {
    const exams = await Exam.find({subjectId : req.params.id});
    return res.status(200).json({
      success : true,
      exmas : exams,
    })
  } catch (error) {
    res.status(501).json(error);
  }
}

/**
 * @method GET
 * @description Method to get all the subject that related to spacifc year
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns Resposne
 */
const getSubjectsByStudyYear = async (req, res) => {
  try {
    const subjects = await Subject.find({year : req.params.year});
    return res.status(200).json({
      success : true,
      subjects : subjects,
    })
  } catch (error) {
    return res.status(501).json(error);
  }
}

module.exports = { index, create, show, update, destroy, uploadImage, department, exams, getSubjectsByStudyYear }