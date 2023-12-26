const mongoose = require('mongoose');
const schemaOptions = {
  strict: false,
  timestamps: false,
  versionKey: false,
};

const UserSchema = new mongoose.Schema({
  user_id: {
    type: String,
    minLength: 3,
    maxLength: 10,
    required: false,
  },
  Email: {
    type: String,
    minLength: 1,
    maxLength: 30,
  },
  Phone_Number: {
    type: String,
  },
  Rate: {
    type: Number,
    required: false,
    default: 0,
  },
  role: {
    type: String,
    required: true,
    enum: ['user','agent','manager','admin'] // Set default value to 'user'
    }
}, schemaOptions);

// Use UserSchema as the model for the "Users" collection
module.exports = mongoose.model('Users', UserSchema);