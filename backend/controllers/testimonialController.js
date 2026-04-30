import Testimonial from "../models/Testimonial.js";

export const createTestimonial = async (req, res) => {
  try {
    const { text } = req.body;

    const clientImg = req.file
      ? `http://localhost:5000/uploads/${req.file.filename}`
      : "";

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "text required",
      });
    }

    const newTestimonial = await Testimonial.create({
      text,
      clientImg,
    });

    res.status(201).json({
      success: true,
      data: newTestimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();

    res.status(200).json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const updateData = {};

    if (req.body.text) {
      updateData.text = req.body.text;
    }

    if (req.file) {
      updateData.clientImg = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id,
      updateData,
      { returnDocument: "after" },
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};
