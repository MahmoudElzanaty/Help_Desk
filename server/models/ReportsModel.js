const mongoose = require('mongoose');

const schemaOptions = {
  strict: false,
  timestamps: false,
};

const ReportSchema = new mongoose.Schema({
  
  tickets: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Tickets", // Reference the Tickets model
  },
 
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users", // Reference the Users model
  },

 
  R_data: {
    type: String,
    minLength: 1,
  },

  
 


    ResolutionTime: {
      type: Date,
      required: true,
    },

    UserRate: {
      type: Number,
      required: true,
    }

}, schemaOptions);

module.exports = mongoose.model('Report', ReportSchema);