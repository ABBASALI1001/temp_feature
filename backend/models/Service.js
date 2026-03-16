const mongoose = require('mongoose');

// Tier Schema (for pricing packages)
const TierSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Tier title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Tier description is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  }
});

// Main Service Schema
const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
    trim: true
  },
  categories: [{
    type: String,
    trim: true
  }],
  industries: [{
    type: String,
    trim: true
  }],
  sources: [{
    type: String,
    trim: true
  }],
  tiers: [TierSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
ServiceSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Service', ServiceSchema);