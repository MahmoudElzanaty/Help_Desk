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
      enum: ['Hardware', 'Software', 'Network'],
      required: true,
    },
    Sub_Category: {
      type: String,
      enum:['Desktops', 'Laptops', 'Printers', 'Servers', 'Networking equipment','Operating system', 'Application software', 'Custom software', 'Integration issues','Email issues', 'Internet connection problems', 'Website errors'],
      required: true,
    },
    Priority: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      required: true,
    },
    Date: {
      type: Date,
      required: true,
    },
    Status: {
      type: String,
      enum: ['open', 'closed', 'in progress'],
        default: true,
        required: true,
      },
      is_Open: {
        type: Boolean,
        required: true,
        default: false,
      },
      is_Pending: {
        type: Boolean,
        required: true,
        default: false,
      },
      is_Closed: {
        type: Boolean,
        required: true,
        default: false,
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