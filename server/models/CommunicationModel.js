const mongoose = require('mongoose');
const schemaOptions = {
  strict: false,
  timestamps: false,
};

const CommunicationSchema = new mongoose.Schema({
  User_Id: {
    type: Number,
    min: 1,
    required: true,
  },
  Agent_Id: {
    type: String,
    min: 1,
    required: true,
  },
  Describtion: {
    type: String,
    minLength: 3,
    maxLength: 1000,
  },
  Date: {
    type: Date,
    required: true,
  },
  Message_Id: {
    type: String,
    minLength: 3,
    maxLength: 30,
  },
}, schemaOptions);

module.exports = mongoose.model('Communication', CommunicationSchema);
