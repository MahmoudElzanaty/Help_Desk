const mongoose = require('mongoose');
const schemaOptions = {
  strict: false,
  timestamps: false,
};

const CommunicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users", 
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    min: 1,
    required: true,
  },
  Describtion: {
    type: String,
    minLength: 3,
    maxLength: 1000,
  },
  Message_Id: {
    type: String,
    minLength: 3,
    maxLength: 30,
  },
}, schemaOptions);

module.exports = mongoose.model('Communication', CommunicationSchema);