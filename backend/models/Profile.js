import mongoose from "mongoose";


const caseSchema = new mongoose.Schema({
    description: { type: String, required: true }
}, { _id: false });

const profileSchema = new mongoose.Schema({
    about: { type: String },
    profileImage: { type: String },
    cases: [caseSchema]
}, { timestamps: true });

const Profile = mongoose.model("Profile", profileSchema)
export default Profile