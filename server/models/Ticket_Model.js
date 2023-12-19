const mongoose = require('mongoose');
const schemaOptions = {
  strict: false,
  timestamps: false,
};

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Users", // Reference the Users model
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },

    Category: {
      type: String,
      enum: ['Hardware', 'Software', 'Network'],
      required: false,
    },
    Sub_Category: {
      type: String,
      enum:['Desktops', 'Laptops', 'Printers', 'Servers', 'Networking equipment','Operating system', 'Application software', 'Custom software', 'Integration issues','Email issues', 'Internet connection problems', 'Website errors'],
      required: false,
    },
    Priority: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      required: false,
    },
    Date: {
      type: Date,
      required: false,
    },
    Status: {
      type: String,
      enum: ['open', 'closed', 'in progress'],
        default: 'open',
        required: false,
      },
      is_Open: {
        type: Boolean,
        required: false,
        default: true,
      },
      is_Pending: {
        type: Boolean,
        required: false,
        default: false,
      },
      is_Closed: {
        type: Boolean,
        required: false,
        default: false,
      },
    TDescribtion: {
      type: String,
      minLength: 3,
      maxLength: 1000,
      required: false,
    },
  },
  schemaOptions);

module.exports = mongoose.model('Ticket', ticketSchema);