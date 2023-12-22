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
  Category: {
    type: String,
    minLength: 3,
    maxLength: 30,
    required: true,
  },
  Sub_Category: {
    type: String,
    minLength: 3,
    maxLength: 30,
    required: true,
  },
}, schemaOptions);

module.exports = mongoose.model('FAQ', FAQSchema);