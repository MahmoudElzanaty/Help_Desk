const mongoose = require('mongoose');
const schemaOptions = {
  strict: false,
  timestamps: false,
};

const FAQSchema = new mongoose.Schema({
  tickets: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "tickets", // Reference the T model
  },
  status: {
    type: Boolean,
    default: true,
  },
  TDescribtion: {
    type: String,
    minLength: 3,
    maxLength: 1000,
  },
  FAQ_ID: {
    type: String,
    min: 1,
    required: true,
  },
}, schemaOptions);

FAQSchema.index({ TDescribtion: 'text' });

module.exports = mongoose.model('FAQ', FAQSchema);