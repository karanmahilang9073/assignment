import express from 'express'
import { addCase, deleteCase, getCases, updateCase } from '../controllers/caseController.js'

const caseRouter = express.Router()

caseRouter.post("/add", addCase)
caseRouter.get("/", getCases)
caseRouter.put("/:id", updateCase)
caseRouter.delete("/:id", deleteCase)

export default caseRouter