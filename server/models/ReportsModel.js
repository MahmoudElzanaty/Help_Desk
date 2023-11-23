const mongoose = require('mongoose');
const schemaOptions = {
  strict: false,
  timestamps: false,
};

const ReportSchema = new mongoose.Schema({
  Report_Id: {
    type: String,
    minLength: 1,
  },
  User_Id: {
    type: String,
    minLength: 1,
  },
  Tstatus: {
    type: Boolean,
    default: true,
  },
  Manager_Id: {
    type: String,
    minLength: 1,
  },
  R_data: {
    type: String,
    minLength: 1,
  },
}, schemaOptions);

module.exports = mongoose.model('Report', ReportSchema);
