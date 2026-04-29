import API from "./api"

const multipartConfig = {
    headers: {
        "Content-Type": "multipart/form-data"
    }
}

export const createProfile = async (profileData) => {
    const res = await API.post("/profile", profileData, multipartConfig)
    return res.data
}

export const getProfile = async (id) => {
    const res = await API.get(id ? `/profile/${id}` : "/profile")
    return res.data
}

export const updateProfile = async (id, profileData) => {
    const res = await API.put(`/profile/${id}`, profileData, multipartConfig)
    return res.data
}

export default {
    createProfile,
    getProfile,
    updateProfile
}
