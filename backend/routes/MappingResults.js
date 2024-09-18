const express = require('express');
const router = express.Router();

const Detail = require('../models/Detail');

// Fetch board details by requirement or other identifier (like board ID)
router.get('/board-details/:id', async (req, res) => {
  console.log("Mapping Result from db")
  const boardId = req.params.id; // Assuming you're using a unique ID for the board

  try {
    const boardDetails = await Detail.findById(boardId); // Fetch by unique ID
    if (!boardDetails) {
      return res.status(404).json({ message: 'Board not found' });
    }
    res.json(boardDetails); // Return the board details
  } catch (error) {
    console.error('Error fetching board details:', error);
    res.status(500).json({ message: 'Error fetching board details' });
  }
});

module.exports = router;
