const mongoose = require('mongoose');
const schemaOptions = {
  strict: false,
  timestamps: false,
};

const WorkflowSchema = new mongoose.Schema(
    {
          user: {
            type: mongoose.Schema.Types.ObjectId,
              required: true,
              ref: "users", // Reference the Users model
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