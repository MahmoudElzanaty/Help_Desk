const mongoose = require('mongoose');
const schemaOptions = {
  strict: false,
  timestamps: true,
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
      ref: "Agents", // Reference the Agents model
      required: false,
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
      required: false,
    },
    Date: {
      type: Date,
      required: false,
    },
    Status: { type: String, enum: ['open', 'inProgress', 'closed'], default: 'open' , required : false },

      
    TDescribtion: {
      type: String,
      minLength: 3,
      maxLength: 1000,
      required: true,
    },

    userRate: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  schemaOptions);

module.exports = mongoose.model('Ticket', ticketSchema);