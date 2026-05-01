import express from "express";
import cors from "cors";
import {connectDB} from "./config/db.js";
import profileRouter from "./routes/prodileRoutes.js";
import caseRouter from "./routes/caseRoutes.js";
import testimonialRouter from "./routes/testimonialRoutes.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

connectDB();

app.get("/",(req,res)=>{
res.send("completing assignment");
});

app.use("/api/profile",profileRouter);
app.use("/api/case",caseRouter);
app.use("/api/testimonial",testimonialRouter);


const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
console.log(`running on ${PORT}`)
})