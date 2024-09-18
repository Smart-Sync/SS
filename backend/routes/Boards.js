const express = require('express');
const router = express.Router();
const Detail = require('../models/Detail'); 

// Fetch all saved boards
router.get('/boards', async (req, res) => {
  try {
    const boards = await Detail.find(); // Fetch all boards
    
    res.json(boards);
  } catch (error) {
    console.error('Error fetching boards:', error);
    res.status(500).json({ message: 'Error fetching boards' });
  }
});

module.exports = router;
