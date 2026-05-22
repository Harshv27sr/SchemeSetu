import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  schemeId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Submitted', 'Under Review', 'Verified', 'Approved', 'Rejected'],
    default: 'Submitted'
  },
  uploadedDocuments: [{
    type: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true }
  }],
  validationResult: {
    status: { type: String, enum: ['Success', 'Mismatch', 'Failed'], default: 'Success' },
    remarks: { type: String, default: '' },
    extractedData: {
      doc1: { name: String, dob: String },
      doc2: { name: String, dob: String }
    }
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Application = mongoose.model('Application', ApplicationSchema);
export default Application;
