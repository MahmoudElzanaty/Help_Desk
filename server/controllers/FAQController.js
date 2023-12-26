const FAQ = require("../models/FAQModel");
const FAQController={
// Get all FAQs
getAllFAQs: async (req, res) => {
  try {
    const faqs = await FAQ.find();
    return res.status(200).json(faqs);
  } catch (error) {
    console.error("Error fetching FAQs:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
},

// Get a specific FAQ by ID
getById: async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    return res.status(200).json(faq);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
},

// Get FAQs based on Category and Sub_Category
GetBySearch: async (req, res) => {
  try {
    console.log('category:', req.query.Category);
    console.log('sub category:', req.query.Sub_Category);
    const searchFAQ = await FAQ.find({ Category: req.query.Category, Sub_Category: req.query.Sub_Category });
    return res.status(200).json(searchFAQ);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
},






// Create a new FAQ
createFAQ: async (req, res) => {
  try {
    const {
      tickets,
      TDescribtion,
      FAQ_ID,
      Category,
      Sub_Category
    } = req.body;

    // Validate that required fields are present
    if (!tickets || !FAQ_ID || !Category || !Sub_Category) {
      return res.status(400).json({ error: 'Incomplete data for FAQ creation' });
    }

    const newFAQ = new FAQ({
      tickets,
      TDescribtion,
      FAQ_ID,
      Category,
      Sub_Category
    });

    const savedFAQ = await newFAQ.save();
    return res.status(201).json(savedFAQ);
  } catch (error) {
    console.error('Error creating FAQ:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
},

// Delete an FAQ
deleteFAQById : async (req, res) => {
  try {
    const deletedFAQ = await FAQ.findByIdAndDelete(req.params.id);

    if (!deletedFAQ) {
      return res.status(404).json({ error: 'FAQ not found' });
    }

    return res.status(200).json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    console.error('Error deleting FAQ:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
},
};

module.exports = FAQController;