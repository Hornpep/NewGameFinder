import { Router } from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/userController.js";
import validateJOI from "../middlewares/validateJOI.js";
import { userSchema } from "../validations/schemas.js";

export default userRouter = Router();

userRouter.get("/:id", verifyToken, getUser);
userRouter.put("/:id", verifyToken, validateJOI(userSchema), updateUser);
userRouter.delete("/:id", verifyToken, deleteUser);