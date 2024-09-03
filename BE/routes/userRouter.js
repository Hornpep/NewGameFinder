import { Router } from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/userController.js";
import validateJOI from "../middlewares/validateJOI.js";
import { userSchema } from "../validations/schemas.js";
import upload from "../utils/multer.js";

export default userRouter = Router();

userRouter.get("/:id", verifyToken, getUser);
userRouter.put("/:id", verifyToken, validateJOI(userSchema), updateUser);
userRouter.put('/update/:id', upload.single('image'), updateUser);
userRouter.delete("/:id", verifyToken, deleteUser);