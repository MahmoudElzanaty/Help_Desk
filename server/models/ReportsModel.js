const mongoose = require('mongoose');
const schemaOptions = {
  strict: false,
  timestamps: false,
};

const ReportSchema = new mongoose.Schema({

  tickets: {
    type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Tickets", // Reference the Users model
    },
 
  agent: {
    type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users", // Reference the Users model
    },

  Tstatus: {
    type: Boolean,
    default: true,
  },
  R_data: {
    type: String,
    minLength: 1,
  },
}, schemaOptions);

module.exports = mongoose.model('Report', ReportSchema);