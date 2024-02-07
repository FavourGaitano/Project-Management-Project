"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../Controllers/user.controller");
const userRouter = (0, express_1.Router)();
userRouter.post('/', user_controller_1.createUser);
userRouter.post('/', user_controller_1.getUsers);
exports.default = userRouter;
