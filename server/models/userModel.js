const mongoose = require('mongoose');
const schemaOptions = {
  strict: false,
  timestamps: false,
};

const UserSchema = new mongoose.Schema({
  User_Id: {
    type: Number,
    minLength: 3,
    required: true,
  },
  Email: {
    type: String,
    minLength: 1,
    maxLength: 30,
  },
  Role: {
    type: Number,
    required: true,
    default: 1,
  },
  Rate: {
    type: Number,
    required: false,
    default: 0,
  },
}, schemaOptions);

const managerSchema = new mongoose.Schema({
  managerId: {
    type: Number,
    minLength: 3,
    required: false,
  },
  Users: [UserSchema],
}, schemaOptions);

// Use managerSchema as the model for the "Users" collection
module.exports = mongoose.model('Users', managerSchema);
