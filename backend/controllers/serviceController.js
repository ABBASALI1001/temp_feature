const Service = require('../models/Service');

// @desc    Create new service
// @route   POST /api/services/create
// @access  Public (will be protected later)
exports.createService = async (req, res) => {
  try {
    console.log('📥 Creating new service...');
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    // Validate required fields
    if (!req.body.title || !req.body.description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required'
      });
    }

    // Check if service with same title exists
    const existingService = await Service.findOne({ title: req.body.title });
    if (existingService) {
      return res.status(400).json({
        success: false,
        message: 'Service with this title already exists'
      });
    }

    // Create service
    const service = await Service.create(req.body);

    console.log('✅ Service created successfully:', service._id);

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service
    });
  } catch (error) {
    console.error('❌ Error creating service:', error);

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Service with this title already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Error creating service'
    });
  }
};

// @desc    Get all services
// @route   GET /api/services
// @access  Public
exports.getServices = async (req, res) => {
  try {
    console.log('📋 Fetching all services...');

    const services = await Service.find().sort({ createdAt: -1 });

    console.log(`✅ Found ${services.length} services`);

    res.status(200).json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    console.error('❌ Error fetching services:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching services'
    });
  }
};

// @desc    Get single service by ID
// @route   GET /api/services/:id
// @access  Public
exports.getServiceById = async (req, res) => {
  try {
    console.log(`🔍 Fetching service with ID: ${req.params.id}`);

    const service = await Service.findById(req.params.id);

    if (!service) {
      console.log('❌ Service not found');
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    console.log('✅ Service found:', service.title);

    res.status(200).json({
      success: true,
      data: service
    });
  } catch (error) {
    console.error('❌ Error fetching service:', error);

    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid service ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching service'
    });
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Public (will be protected later)
exports.updateService = async (req, res) => {
  try {
    console.log(`📝 Updating service: ${req.params.id}`);

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    console.log('✅ Service updated successfully');

    res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      data: service
    });
  } catch (error) {
    console.error('❌ Error updating service:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating service'
    });
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Public (will be protected later)
exports.deleteService = async (req, res) => {
  try {
    console.log(`🗑️ Deleting service: ${req.params.id}`);

    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    console.log('✅ Service deleted successfully');

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('❌ Error deleting service:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting service'
    });
  }
};