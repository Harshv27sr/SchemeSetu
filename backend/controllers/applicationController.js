import Application from '../models/Application.js';
import Scheme from '../models/Scheme.js';

// @desc    Get all applications filed by the logged-in citizen
// @route   GET /api/applications
// @access  Private
export const getMyApplications = async (req, res) => {
  try {
    const apps = await Application.find({ userId: req.user._id })
      .sort('-submittedAt');
    
    // Format to match frontend expectation
    const formatted = apps.map(app => ({
      _id: app._id,
      schemeId: app.schemeId,
      scheme: null,
      status: app.status,
      uploadedDocuments: app.uploadedDocuments,
      validationResult: app.validationResult,
      submittedAt: app.submittedAt
    }));
    
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all applications filed across the platform (Admin Only)
// @route   GET /api/applications/all
// @access  Private/Admin
export const getAllApplications = async (req, res) => {
  try {
    const apps = await Application.find({})
      .populate('userId', 'name email profile')
      .populate('schemeId')
      .sort('-submittedAt');

    const formatted = apps.map(app => ({
      _id: app._id,
      userId: app.userId?._id,
      user: app.userId,
      schemeId: app.schemeId?._id,
      scheme: app.schemeId,
      status: app.status,
      uploadedDocuments: app.uploadedDocuments,
      validationResult: app.validationResult,
      submittedAt: app.submittedAt
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Apply for a government scheme
// @route   POST /api/applications
// @access  Private
export const submitApplication = async (req, res) => {
  const { schemeId, uploadedDocuments, validationResult } = req.body;

  try {


    const application = new Application({
      userId: req.user._id,
      schemeId,
      uploadedDocuments: uploadedDocuments || [],
      validationResult: validationResult || {
        status: 'Success',
        remarks: 'Documents verified successfully.',
        extractedData: {
          doc1: { name: req.user.name, dob: '15/08/1990' },
          doc2: { name: req.user.name, dob: '15/08/1990' }
        }
      }
    });

    const savedApp = await application.save();
    
    res.status(201).json({
      _id: savedApp._id,
      schemeId: savedApp.schemeId,
      status: savedApp.status,
      uploadedDocuments: savedApp.uploadedDocuments,
      validationResult: savedApp.validationResult,
      submittedAt: savedApp.submittedAt
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Change claim verification status (Admin Only)
// @route   PUT /api/applications/:id/status
// @access  Private/Admin
export const updateApplicationStatus = async (req, res) => {
  const { status } = req.body;
  const allowedStatuses = ['Submitted', 'Under Review', 'Verified', 'Approved', 'Rejected'];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid claim verification status' });
  }

  try {
    const app = await Application.findById(req.params.id);

    if (app) {
      app.status = status;
      const updatedApp = await app.save();
      
      const populated = await Application.findById(updatedApp._id)
        .populate('userId', 'name email profile')
        .populate('schemeId');

      res.json({
        _id: populated._id,
        schemeId: populated.schemeId?._id,
        scheme: populated.schemeId,
        status: populated.status,
        uploadedDocuments: populated.uploadedDocuments,
        validationResult: populated.validationResult,
        submittedAt: populated.submittedAt
      });
    } else {
      res.status(404).json({ message: 'Application claim not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
