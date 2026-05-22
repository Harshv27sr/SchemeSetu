import Scheme from '../models/Scheme.js';

// @desc    Get all active government schemes
// @route   GET /api/schemes
// @access  Public
export const getSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.find({});
    res.json(schemes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single government scheme details
// @route   GET /api/schemes/:id
// @access  Public
export const getSchemeById = async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    if (scheme) {
      res.json(scheme);
    } else {
      res.status(404).json({ message: 'Government Scheme not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new government scheme (Admin Only)
// @route   POST /api/schemes
// @access  Private/Admin
export const createScheme = async (req, res) => {
  const { title, description, benefits, state, category, deadline, requiredDocuments, eligibility } = req.body;

  try {
    const scheme = new Scheme({
      title,
      description,
      benefits,
      state: state || 'Central',
      category: category || 'All',
      deadline,
      requiredDocuments,
      eligibility
    });

    const createdScheme = await scheme.save();
    res.status(201).json(createdScheme);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update government scheme (Admin Only)
// @route   PUT /api/schemes/:id
// @access  Private/Admin
export const updateScheme = async (req, res) => {
  const { title, description, benefits, state, category, deadline, requiredDocuments, eligibility } = req.body;

  try {
    const scheme = await Scheme.findById(req.params.id);

    if (scheme) {
      scheme.title = title || scheme.title;
      scheme.description = description || scheme.description;
      scheme.benefits = benefits || scheme.benefits;
      scheme.state = state || scheme.state;
      scheme.category = category || scheme.category;
      scheme.deadline = deadline || scheme.deadline;
      scheme.requiredDocuments = requiredDocuments || scheme.requiredDocuments;
      scheme.eligibility = eligibility || scheme.eligibility;

      const updatedScheme = await scheme.save();
      res.json(updatedScheme);
    } else {
      res.status(404).json({ message: 'Scheme Registry not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a scheme (Admin Only)
// @route   DELETE /api/schemes/:id
// @access  Private/Admin
export const deleteScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);

    if (scheme) {
      await scheme.deleteOne();
      res.json({ message: 'Scheme successfully purged from registry' });
    } else {
      res.status(404).json({ message: 'Scheme not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
