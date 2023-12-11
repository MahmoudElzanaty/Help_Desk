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

  //import ticket

  // agentPerformance: [{
  //   agent: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Users',
  //     required: true,
  //   },
  //   Rate: {
  //     type: Number,
  //     required: true,
  //   },
  // }],

  // Status: {
  //   type: String,
  //   enum: ['open', 'closed', 'in progress'],
  //     default: true,
  //     required: true,
  //   },

    ResolutionTime: {
      type: Date,
      required: true,
    },

    UserRate: {
      type: Number,
      required: true,
    }

}, schemaOptions);

ReportSchema.index({ Status: 'text'})

module.exports = mongoose.model('Report', ReportSchema);
