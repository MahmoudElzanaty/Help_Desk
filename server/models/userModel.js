const mongoose = require('mongoose');

const schemaOptions = {
  strict: false,
  timestamps: false,
  versionKey: false,
};

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 30,
    required: true,
  },
  Email: {
    type: String,
    minLength: 1,
    maxLength: 30,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAgent: {
    type: Boolean,
    required: true,
    default: false,
  },
  isManager: {
    type: Boolean,
    required: true,
    default: false,
  },
  phoneNumber: {
    type: String,
  },
  rate: {
    type: Number,
    required: false,
    default: 0,
  },
}, schemaOptions);

// Use UserSchema as the model for the "Users" collection
module.exports = mongoose.model('Users', UserSchema);
