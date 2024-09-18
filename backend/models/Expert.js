const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the expert schema
const expertSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  qualifications: {
    type: String,
  },
  skills: {
    type: String,
  },
  years_of_experience: {
    type: Number,
    required: true,
  },
  date_of_availability: {
    type: Date,
  },
});

// Create and export the Expert model
const Expert = mongoose.model('Expert', expertSchema);
module.exports = Expert;
const mongoose = require("mongoose");

// Define the schema for the `experts` collection
const expertSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  qualifications: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  years_of_experience: {
    type: Number,
    required: true,
  },
  date_of_availability: {
    type: Date,
    required: true,
  },
});

// Create a model for the `experts` collection
module.exports = mongoose.model('Experts',expertSchema)
