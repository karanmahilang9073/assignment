import API from "./api"

export const createTestimonial = async (testimonialData) => {
    const res = await API.post("/testimonial", testimonialData)
    return res.data
}

export const getTestimonials = async () => {
    const res = await API.get("/testimonial")
    return res.data
}

export const updateTestimonial = async(id,data)=>{
    const res = await API.put(`/testimonial/${id}`,data)
    return res.data
}

export const deleteTestimonial = async (id) => {
    const res = await API.delete(`/testimonial/${id}`)
    return res.data
}

export default {
    createTestimonial,
    getTestimonials,
    updateTestimonial,
    deleteTestimonial
}
