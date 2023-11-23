const mongoose = require('mongoose');
const schemaOptions = {
  strict: false,
  timestamps: false,
};

const WorkflowSchema = new mongoose.Schema(
    {
        Workflow_Id: {
            type: String,
            minLength: 1,
        maxLength: 30,
          },
          User_Id: {
            type: Number,
            min: 1,
            required: true,
          },
        Category: {
            type: String,
            minLength: 3,
        maxLength: 30,
        },
     Sub_Category:{
        type: String,
        minLength: 3,
        maxLength: 30,
      },
    Workflow_Steps:{
        type: String,
        minLength: 3,
        maxLength: 1000,
    },
    Issue_Type:{
        type: String,
        minLength: 3,
        maxLength: 30,
    },

//Workflow:[WorkflowSchema]
},
{
    strict: false,
    timestamps: true,
  }
);

module.exports = mongoose.model('Workflow', WorkflowSchema);