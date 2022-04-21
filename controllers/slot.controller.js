const { response } = require('express');
const Slot = require('../models/Slot');
const validateSlot = require('../validation/slot.validation');

const index = async (req, res) => {
  try {
    const slots = await Slot.find();
    return res.status(200).json({
      success : true,
      message : "Fetched successfully",
      slots,
    })
  } catch (error) {
    return res.status(501).json(error);
  }
}

const create = async (req, res) => {
  const {error, value} = validateSlot(req.body);
  if (error) return res.status(400).json(error.details);

  try {
    const slot = await Slot.create(value);
    return res.status(201).json({
      success : true,
      message : "Created successfully",
      slot : slot,
    })
  } catch (error) {
    return res.status(501).json(error);
  }
}

const show = async (req, res) => {
  try {
    const slot = await Slot.findById(req.params.id);
    if (slot) {
      return res.status(200).json({
        success : true,
        message : 'Fetched successfully',
        slot,
      });
    }
    return res.status(404).json({
      error : true,
      message : "Slot may not exist",
    })
  } catch (error) {
    return req.status(501).json(error);
  }
}