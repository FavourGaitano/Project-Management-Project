import { Router } from "express";
import { createUser } from "../Controllers/user.controller";

const userRouter = Router()

userRouter.post('/', createUser)
// userRouter.post('/', getUSers)

export default userRouter