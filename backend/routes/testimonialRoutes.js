import express from "express"
import upload from "../middlewares/uploadMiddlewares.js"
import {
    createTestimonial,
    getTestimonials,
    updateTestimonial,
    deleteTestimonial
} from "../controllers/testimonialController.js"

const testimonialRouter = express.Router()

testimonialRouter.post("/", upload.single("clientImg"), createTestimonial)
testimonialRouter.get("/", getTestimonials)
testimonialRouter.put("/:id", upload.single("clientImg"), updateTestimonial)
testimonialRouter.delete("/:id", deleteTestimonial)

export default testimonialRouter
