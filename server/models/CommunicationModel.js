const mongoose = require('mongoose');
const schemaOptions = {
  strict: false,
  timestamps: false,
};

const CommunicationSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],

  isAgent: { type: mongoose.Schema.Types.ObjectId, ref: "users" },

  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },

  Message: {  
    type: String,
    minLength: 3,
    maxLength: 30,
  },
}, schemaOptions);


module.exports = mongoose.model('Communication', CommunicationSchema);