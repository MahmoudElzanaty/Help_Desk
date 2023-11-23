const mongoose = require('mongoose');
const schemaOptions = {
  strict: false,
  timestamps: false,
};

const FAQSchema = new mongoose.Schema({
  Ticket_id: {
    type: String,
    minLength: 1,
    required: true,
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

module.exports = mongoose.model('FAQ', FAQSchema);