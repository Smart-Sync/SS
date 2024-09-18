const express = require("express");
const router = express.Router();
const Board = require("../models/Board");
// Submit Form
router.post('/requirements', async (req, res) => {
    try {
      const newRequirement = new Board(req.body);
      await newRequirement.save();
      res.status(201).json(newRequirement);
    } catch (error) {
      res.status(500).json({ message: 'Error saving requirement', error });
    }
  });
  
  // Get All Requirements
  router.get('/requirements', async (req, res) => {
    try {
      const requirements = await Board.find();
      res.status(200).json(requirements);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching requirements', error });
    }
  });
  module.exports = router;
  