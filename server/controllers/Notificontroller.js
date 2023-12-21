// Notifi.js
const nodemailer = require('nodemailer');
const UserModel = require('../Models/userModel');
const TicketModel = require('../models/Ticket_Model'); // Update the import to match the new file name

// Create a Nodemailer transporter using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abdulsamea2003@gmail.com',
    pass: 'zmtt vxgh onij luey',
  },
});

// Function to send an email
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'abdulsamea2003@gmail.com',
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Controller function to handle the submission of a new ticket
const submitTicket = async (req, res) => {
  try {
    const { user: userId } = req.body;
    const user = await UserModel.findById(userId);

    if (user) {
      const subject = 'New Ticket Created';
      const text = 'Thank you for submitting a new ticket. Your ticket has been successfully created.';
      await sendEmail(user.Email, subject, text);
    }

    res.status(200).json({ message: 'Ticket submitted successfully' });
  } catch (error) {
    console.error('Error submitting ticket:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to handle the change of ticket status
const changeTicketStatus = async (req, res) => {
  try {
    const { ticketId, newStatus } = req.body;
    console.log('Request Body:', req.body);

    const ticket = await TicketModel.findById(ticketId).populate('user');
    console.log('Retrieved Ticket:', ticket);

    if (ticket && ticket.user) {
      const subject = `Ticket Status Changed to ${newStatus}`;
      const text = `The status of your ticket has been changed to ${newStatus}.`;

      // Update the ticket status in the database
      ticket.Status = newStatus;
      await ticket.save();

      await sendEmail(ticket.user.Email, subject, text);
    }

    res.status(200).json({ message: 'Ticket status changed successfully' });
  } catch (error) {
    console.error('Error changing ticket status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  submitTicket,
  changeTicketStatus,
};
