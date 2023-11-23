const mongoose = require('mongoose');
const schemaOptions = {
  strict: false,
  timestamps: false,
};
const ticketSchema= new mongoose.Schema(

 {
    Ticket_Id: {
      type: String,
      min: 1,
      required: true,
    },
    User_Id: {
      type: Number,
      min: 1,
      required: false,
    },
    Agent_Id:{
        type: String,
      min: 1,
      required: false,
    },
    Category:{
        type: String,
      minLength: 3,
      maxLength: 30,
    },
    Sub_Category:{
        type: String,
      minLength: 3,
      maxLength: 30,
    },
    Priority:{
        type: String,
      minLength: 3,
      maxLength: 30,
    },
    Date:{
        type: Date,
        required: true,
    },
    Status:{
        type: Boolean,
        default: true,
    },
    TDescribtion:{
        type: String,
      minLength: 3,
      maxLength: 1000,
    },
    //tickets:[ticketSchema]
  },
  // schemaOptions
  {
    strict: false,
    timestamps: true,
  }
);

module.exports = mongoose.model('Ticket', ticketSchema);