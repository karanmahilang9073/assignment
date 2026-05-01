import API from "./api"

export const createProfile = async (profileData) => {
    const res = await API.post("/profile", profileData)
    return res.data
}

export const getProfile = async (id) => {
    const res = await API.get(id ? `/profile/${id}` : "/profile")
    return res.data
}

export const updateProfile = async (id, profileData) => {
    const res = await API.put(`/profile/${id}`, profileData)
    return res.data
}

export default {
    createProfile,
    getProfile,
    updateProfile
}
