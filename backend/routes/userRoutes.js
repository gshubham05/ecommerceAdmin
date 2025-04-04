import express from "express";

import { adminLogin,userLogin,registerLogin } from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.post("/login",userLogin)
userRouter.post("/register",registerLogin)
userRouter.post("/admin",adminLogin)

export default userRouter