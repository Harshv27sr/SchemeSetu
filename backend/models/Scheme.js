import mongoose from 'mongoose';

const SchemeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  benefits: {
    type: String,
    required: true
  },
  detailedDescription: {
    type: String,
    default: ''
  },
  detailedBenefits: {
    type: String,
    default: ''
  },
  detailedEligibility: {
    type: String,
    default: ''
  },
  applicationProcess: {
    type: String,
    default: ''
  },
  state: {
    type: String,
    required: true,
    default: 'Central'
  },
  category: {
    type: String,
    required: true,
    default: 'All'
  },
  deadline: {
    type: Date,
    required: true
  },
  requiredDocuments: [{
    type: String,
    required: true
  }],
  eligibility: {
    minAge: { type: Number, default: 0 },
    maxAge: { type: Number, default: 100 },
    maxIncome: { type: Number, required: true },
    allowedOccupations: [{ type: String, default: ["All"] }],
    allowedCategories: [{ type: String, default: ["All"] }],
    allowedStates: [{ type: String, default: ["All"] }],
    allowedGenders: [{ type: String, default: ["All"] }],
    targetSpecialCategories: [{ type: String }]
  }
}, {
  timestamps: true
});

const Scheme = mongoose.model('Scheme', SchemeSchema);
export default Scheme;
