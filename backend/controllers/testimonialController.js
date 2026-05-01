import Testimonial from "../models/Testimonial.js";

export const createTestimonial = async (req, res) => {
  try {
    const { text } = req.body;
    const clientImg = req.file ? req.file.path : "";
    if (!text) {
      return res.status(400).json({success: false, message: "text required"});
    }
    const newTestimonial = await Testimonial.create({text, clientImg});

    res.status(201).json({ success: true, data: newTestimonial});
  } catch (error) {
    res.status(500).json({success: false, message: error.message || "Failed to create testimonial"});
  }
};

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();

    res.status(200).json({ success: true, data: testimonials});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const updateData = {};

    if (req.body.text) {
      updateData.text = req.body.text;
    }

    if (req.file) {
      updateData.clientImg = req.file.path;
    }

    const updated = await Testimonial.findByIdAndUpdate( req.params.id, updateData, { returnDocument: "after"},);

    if (!updated) {
      return res.status(404).json({success: false, message: "Testimonial not found"});
    }

    res.status(200).json({ success: true, data: updated});
  } catch (error) {
    res.status(500).json({success: false, message: error.message || "Failed to update testimonial"});
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);

    res.status(200).json({success: true});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};
