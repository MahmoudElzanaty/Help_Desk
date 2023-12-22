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
  const { Category, Sub_Category } = req.query;

  try {
    const faqs = await FAQ.find({
      Category: Category,
      Sub_Category: Sub_Category,
    });

    if (!faqs || faqs.length === 0) {
      return res.status(404).json({ message: "FAQs not found" });
    }

    return res.status(200).json(faqs);
  } catch (error) {
    console.error("Error fetching FAQs:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
},


// Create a new FAQ
CreateFAQ: async (req, res) => {
  try {
    const newFAQ = await FAQ.create(req.body);
    return res.status(201).json(newFAQ);
  } catch (error) {
    console.error("Error creating FAQ:", error.message);
    return res.status(400).json({ message: "Bad Request" });
  }
},

// Delete an FAQ
DeleteFAQ: async (req, res) => {
  try {
    const deletedFAQ = await FAQ.findByIdAndDelete(req.params.id);
    if (!deletedFAQ) {
      return res.status(404).json({ message: "FAQ not found" });
    }
    return res.status(200).json(deletedFAQ);
  } catch (error) {
    console.error("Error deleting FAQ:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
},
};

module.exports = FAQController;