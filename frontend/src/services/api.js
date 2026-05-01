import axios from "axios"

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export const getProfile = async (id) => {
    const res = await API.get(id ? `/profile/${id}` : "/profile")
    return res.data
}

export const getCases = async () => {
    const res = await API.get("/case")
    return res.data
}

export const getTestimonials = async () => {
    const res = await API.get("/testimonial")
    return res.data
}

export default API
