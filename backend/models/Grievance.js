import mongoose from 'mongoose';

const GrievanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ticketId: {
    type: String,
    required: true,
    unique: true
  },
  query: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending Review', 'Officer Responded', 'Resolved'],
    default: 'Pending Review'
  },
  reply: {
    type: String,
    default: null
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Grievance = mongoose.model('Grievance', GrievanceSchema);
export default Grievance;
