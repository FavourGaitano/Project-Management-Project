import { Router } from "express";
import { createUser, getUsers } from "../Controllers/user.controller";

const userRouter = Router()

userRouter.post('/', createUser)
userRouter.post('/', getUsers)

export default userRouter

