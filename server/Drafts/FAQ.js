const express = require("express");
const router = express.Router();
const FAQ = require("../Models/FAQModel");

// Get all FAQs
router.get("/", async (req, res) => {
  try {
    const faqs = await FAQ.find();
    return res.status(200).json(faqs);
  } catch (e) {
    console.error("Error fetching FAQs:", e);
    return res.status(500).json({ message: e.message });
  }
});

// Create a new FAQ
router.post("/", async (req, res) => {
  try {
    const newFAQ = await FAQ.create(req.body);
    return res.status(201).json(newFAQ);
  } catch (e) {
    console.error("Error creating FAQ:", e);
    return res.status(400).json({ message: e.message });
  }
});

// Delete an FAQ
router.delete("/:id", async (req, res) => {
    try {
      const deletedFAQ = await FAQ.findOneAndDelete({ FAQ_ID: req.params.id });
      if (!deletedFAQ) {
        return res.status(404).json({ message: "FAQ not found" });
      }
      return res.status(200).json(deletedFAQ);
    } catch (e) {
      console.error("Error deleting FAQ:", e);
      return res.status(500).json({ message: e.message });
    }
  });

module.exports = router;
