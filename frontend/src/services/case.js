import API from "./api"

export const addCase = async (caseData) => {
    const res = await API.post("/case/add", caseData)
    return res.data
}

export const getCases = async () => {
    const res = await API.get("/case")
    return res.data
}

export const updateCase = async (id, caseData) => {
    const res = await API.put(`/case/${id}`, caseData)
    return res.data
}

export const deleteCase = async (id) => {
    const res = await API.delete(`/case/${id}`)
    return res.data
}

export default {
    addCase,
    getCases,
    updateCase,
    deleteCase
}
