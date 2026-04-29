import mongoose from "mongoose";

const caseSchema = new mongoose.Schema({
    description: {type: String}
}, {timestamps: true})

const Case = mongoose.model("Case", caseSchema)

export default Case