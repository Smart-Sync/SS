const express = require('express');
const router = express.Router();
const Detail = require('../models/Detail'); // Ensure the correct model is imported


router.get('/update-response', async (req, res) => {
    const { token, response } = req.query; // Extract token from query
    console.log("Test")
    try {
      console.log("Test")

      const doc = await Detail.findOne({
        'experts.token': token
      });
      console.log("Detail found")
      console.log(doc)
      // Find the correct expert and interview based on the token
      const result = await Detail.findOneAndUpdate(
        { 'experts.token': token }, // Find the expert with this token
        { $set: { 'experts.$.acceptanceStatus': response === 'accepted' } } ,// Update the acceptance status
        { new: true }

      );
  
      if (result) {
        res.send(`<p>Thank you! Your response has been recorded as ${response === 'accepted' ? 'Accepted' : 'Declined'}.</p>`);
      } else {
        res.status(400).send('<p>Invalid token or interview not found.</p>');
      }
    } catch (error) {
      console.error('Error handling response', error);
      res.status(500).send('<p>Error handling your response. Please try again later.</p>');
    }
  });

  module.exports = router;
