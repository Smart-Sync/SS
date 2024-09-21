const express = require('express');
const router = express.Router();
const Expert = require('../models/Expert'); // Import your save details controller
router.get('/experts/:{email}', async (req, res) => {
    try {
      const expert = await Expert.find(); // Assuming 'Expert' is your model name
      res.status(200).json(expert);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching experts' });
    }
  });

module.exports = router;