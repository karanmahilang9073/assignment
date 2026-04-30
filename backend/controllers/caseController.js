import Case from "../models/Case.js"


export const addCase = async(req, res) => {
    try {
        const {description} = req.body
        if(!description) {
            return res.status(404).json({success : false, message : 'description is required'})
        }
        const newcase = await Case.create({description})
        res.status(201).json({success : true, message : 'case added successfully'})
    } catch (error) {
        res.status(500).json({success : false, message : 'failed to add case'})
    }
}

export const getCases = async(req,res) => {
    try {
        const cases = await Case.find()
        if(!cases){
            return res.status(404).json({success : false, message : 'case not found'})
        }
        res.status(200).json({success : true,  data : cases})
    } catch (error) {
        res.status(500).json({success : false, message : 'failed to fetch cases'})
    }
}

export const updateCase = async(req, res) => {
    try {
        const caseId = req.params.id 
        const updatedCase = await Case.findByIdAndUpdate(caseId, req.body, 
            { returnDocument: 'after', runValidators : true }
        )
        if(!updatedCase){
            return res.status(404).json({success : false, message : 'case not found'})
        }
        res.status(200).json({success : true,message : 'case updated successfully',  data : updatedCase})
    } catch (error) {
        res.status(500).json({success : false, message : 'failed to update case'})
    }
}

export const deleteCase = async(req,res) => {
    try {
        const caseId = req.params.id 
        const deletedcase = await Case.findByIdAndDelete(caseId)
        if(!deletedcase){
            return res.status(404).json({success : false, message : 'case not found'})
        }
        res.status(200).json({success : true,message : 'case updated successfully'})
    } catch (error) {
        res.status(500).json({success : false, message : 'failed to delete case'})
    }
}