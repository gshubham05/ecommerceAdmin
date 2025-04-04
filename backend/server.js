import express from "express";
import "dotenv/config";
import cors from "cors"
import connectDB from "./config/mongodb.js";
import connectClodudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";

// App config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectClodudinary();

// Middleware
app.use(express.json())
app.use(cors())

// Api ends
app.use("/api/user",userRouter)
app.use("/api/product",productRouter)

app.get("/",(req,res)=>{
    console.log("Api is working")
})

app.listen(port,()=>{
    console.log("Running",port)
})