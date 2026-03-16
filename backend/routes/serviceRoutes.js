const express = require('express');
const router = express.Router();
const {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService
} = require('../controllers/serviceController');

// Public Routes (no auth required)
router.get('/', getServices);
router.get('/:id', getServiceById);

// Admin Routes (will add authentication later)
router.post('/create', createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

// Test route to check if routes are working
router.get('/test', (req, res) => {
  res.json({ message: 'Services routes are working!' });
});

module.exports = router;