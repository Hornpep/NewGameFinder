import { Router } from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/userController.js";
import validateJOI from "../middlewares/validateJOI.js";
import { userSchema } from "../validations/schemas.js";

export default userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.post("/", validateJOI(userSchema), createUser);
userRouter.put("/:id", validateJOI(userSchema), updateUser);
userRouter.delete("/:id", deleteUser);

// createUser != signup -> createUser für Admin gedacht, signup für normale User