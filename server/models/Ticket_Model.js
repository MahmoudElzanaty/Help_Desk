const mongoose = require('mongoose');
const schemaOptions = {
  strict: false,
  timestamps: false,
};

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users", // Reference the Users model
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
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
    Priority: {
      type: String,
      minLength: 3,
      maxLength: 30,
      required: true,
    },
    Date: {
      type: Date,
      required: true,
    },
    Status: {
      type: Boolean,
      default: true,
      required: true,
    },
    TDescribtion: {
      type: String,
      minLength: 3,
      maxLength: 1000,
      required: true,
    },
  },
  schemaOptions);

module.exports = mongoose.model('Ticket', ticketSchema);