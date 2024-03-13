const express = require('express');
const router = express.Router();
const Climb = require('../models/climb');

// POST a new climb
router.post('/', async (req, res) => {
  const { name, location, grade, notes, x, y } = req.body;

  try {
    const newClimb = new Climb({ name, location, grade, notes, x, y });
    await newClimb.save();
    console.log('Climb saved:', newClimb);
    res.status(201).json(newClimb);
  } catch (err) {
    console.error('Failed to save the climb:', err);
    res.status(400).json({ message: err.message });
  }
});

// GET all climbs
router.get('/', async (req, res) => {
  try {
    const climbs = await Climb.find();
    res.json(climbs);
  } catch (err) {
    console.error('Failed to fetch climbs:', err);
    res.status(500).json({ message: err.message });
  }
});

// PUT (update) a specific climb
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedClimb = await Climb.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedClimb) {
      return res.status(404).json({ message: 'Climb not found' });
    }
    console.log('Climb updated:', updatedClimb);
    res.json(updatedClimb);
  } catch (err) {
    console.error('Failed to update the climb:', err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
