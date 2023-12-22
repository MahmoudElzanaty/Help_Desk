const mongoose = require('mongoose');
const schemaOptions = {
  strict: false,
  timestamps: false,
  versionKey: false,
};

const UserSchema = new mongoose.Schema({
  user_id: 
    [{ type: mongoose.Schema.Types.ObjectId, required : true ,ref: 'Users' }]
  ,
  Email: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 30,
    },
    category: { type: String, required: true },
    maxCapacity: { type: Number, required: true },
    softwarePercentage: { type: Number, required: true },
    hardwarePercentage: { type: Number, required: true },
    networkPercentage: { type: Number, required: true },
    currentLoad: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
    
  Rate: {
    type: Number,
    required: false,
    default: 0,
  },
}, schemaOptions);

// Use UserSchema as the model for the "Agents" collection
module.exports = mongoose.model('Agents', AgentSchema);