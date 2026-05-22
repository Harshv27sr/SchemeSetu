import Grievance from '../models/Grievance.js';

// @desc    Create a support desk grievance ticket
// @route   POST /api/grievances
// @access  Private
export const createGrievance = async (req, res) => {
  const { query } = req.body;

  if (!query || !query.trim()) {
    return res.status(400).json({ message: 'Query content is required' });
  }

  try {
    const ticketId = `TKT-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const grievance = new Grievance({
      userId: req.user._id,
      ticketId,
      query
    });

    const savedGrievance = await grievance.save();
    res.status(201).json(savedGrievance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all grievance tickets for logged-in citizen
// @route   GET /api/grievances
// @access  Private
export const getMyGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find({ userId: req.user._id }).sort('-createdAt');
    res.json(grievances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all grievance tickets (Admin Only)
// @route   GET /api/grievances/all
// @access  Private/Admin
export const getAllGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find({})
      .populate('userId', 'name email')
      .sort('-createdAt');
    res.json(grievances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Submit an officer response reply to a ticket (Admin Only)
// @route   PUT /api/grievances/:id/reply
// @access  Private/Admin
export const replyToGrievance = async (req, res) => {
  const { reply, status } = req.body;

  if (!reply || !reply.trim()) {
    return res.status(400).json({ message: 'Reply content is required' });
  }

  try {
    const grievance = await Grievance.findById(req.params.id);

    if (grievance) {
      grievance.reply = reply;
      grievance.status = status || 'Officer Responded';
      const updated = await grievance.save();
      
      const populated = await Grievance.findById(updated._id).populate('userId', 'name email');
      res.json(populated);
    } else {
      res.status(404).json({ message: 'Grievance ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
