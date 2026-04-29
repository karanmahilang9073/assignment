import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
    text: {type: String},
    clientImg: {type: String}
}, {timestamps: true})

const Testimonial = mongoose.model("Testimonial", testimonialSchema)

export default Testimonial