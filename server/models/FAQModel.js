const mongoose = require('mongoose');
const schemaOptions = {
  strict: false,
  timestamps: false,
};

const FAQSchema = new mongoose.Schema({
  tickets: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "tickets", // Reference the T model
  },

  Question: {
    type: String,
    minLength: 3,
    maxLength: 1000,
  },
  
  Answer: {
    type: String,
    minLength: 3,
    maxLength: 1000,
  },
  FAQ_ID: {
    type: String,
    min: 1,
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
}, schemaOptions);

module.exports = mongoose.model('FAQ', FAQSchema);