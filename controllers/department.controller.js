const { imageUploader } = require('../helpers/imageUploader');
const Collage = require('../models/Collage');
const Department = require('../models/Department');
const Subject = require('../models/Subject');
const validateDepartment = require('../validation/department.validation');

/**
 * @method GET
 * @description Method to get all departments from database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const index = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({
      success : true,
      message : "Fetched successfully",
      departments : departments
    });
  } catch (error) {
    return res.status(501).json(error);
  }
}


/**
 * @method POST
 * @description method to store new department in database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const create = async (req, res) => {
  const {error, value} = validateDepartment(req.body, req.file.filename);

  if (error) return res.status(400).json(error.details);

  try {
    const collage = Collage.findById(value.collageId);

    if (!collage) {
      return res.status(404).json({
        error : true,
        message : 'University may not exist',
      })
    }

    const department = await Department.create(value);
    return res.status(201).json({
      sussess : true,
      message : 'Department created successfully',
      department : department,
    });

  } catch (error) {
    return res.status(501).json(error);
  }
  
}

/**
 * @method GET
 * @description Method to get a single department from database
 * @param {*} req 
 * @param {*} res 
 */
const show = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      res.status(404).json({
        error : true,
        message : 'Department My not exist',
      }); 
    }

    return res.status(201).json({
      success : true,
      message : 'Department fetched successfully',
      department : department,
    });
  } catch (error) {
    res.status(501).json(error);
  }
}

/**
 * @method PUT
 * @description Method to update a single department by its id
 * 
 * @param {*} req 
 * @param {*} res 
 */
const update = async (req, res) => {
  const {error, value} = validateDepartment(req.body, req.file.filename);

  if (error) return res.status(400).json(error.details);
  
  try {
    const collage = Collage.findById(value.collageId);

    if (!collage) {
      return res.status(404).json({
        error : true,
        message : 'University may not exist',
      })
    }

    const department = await Department.findByIdAndUpdate(req.params.id, value);

    if (!department) {
      return res.status(404).json({
        error : true,
        message : 'Could not update the department',
      }); 
    }

    return res.status(202).json({
      success : true,
      message : 'Department updated successfully',
      department : department,
    });
  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 * @method DELETE
 * @description Method to delete a single department
 * 
 * @param {*} req 
 * @param {*} res 
 * @
 */
const destroy = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);

    if (!department) {
      return res.status(404).json({
        error : true,
        message : 'Department may not exist',
      });
    } 

    return res.status(202).json({
      success : true,
      message : 'Department deleted successfully',
    });
  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 * @method PATCH
 * @description Method to upload a department image
 * 
 * @param {*} req 
 * @param {*} res 
 */
const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      error : true,
      message : "Does not uploaded",
    })
  }
  return res.status(200).json({
    success : true,
    data : req.file,
  });
}

/**
 * @method GET
 * @description Method to get all department's subjects
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns void
 */
const subjects = async (req, res) => {
  try {
    const subjects = await Subject.find({departmentId : req.params.id});
    return res.status(200).json({
      success : true,
      message : 'Subjects fetched successfully',
      subjects : subjects,
    })
  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 * @method GET
 * @description Method to get a single department's subject
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns response
 */
const getSubject = async (req, res) => {
  try {
    const subject = await Subject.find({
      _id : req.params.subjectId,
      departmentId : req.params.id
    })
    if (subject) {
      return res.status(200).json({
        success : true,
        message : 'Fetched successfully',
      })
    }
    return res.status(404).json({
      error : true,
      message : "Subject id or department id may not exist",
    })
  } catch (error) {
    res.status(501).json(error);
  }
}

module.exports = { index, create, show, update, destroy, uploadImage, subjects, getSubject }