import express from "express"
import { createProfile, getProfile, updateProfile, getAllProfiles } from "../controllers/profileController.js"
import upload from "../middlewares/uploadMiddlewares.js"

const profileRouter = express.Router()

profileRouter.post('/', upload.single('profileImage'), createProfile)
profileRouter.get("/:id", getProfile)
profileRouter.put("/:id", upload.single('profileImage'), updateProfile)
profileRouter.get("/",getAllProfiles);


export default profileRouter