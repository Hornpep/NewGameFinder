import { Router } from 'express';
import validateJOI from '../middlewares/validateJOI.js';
import verifyToken from '../middlewares/verifyToken.js';
import { loginSchema, signupSchema } from '../validations/schemas.js';
import { signup, login, whoAmI, logout } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post('/signup', validateJOI(signupSchema), signup);
authRouter.post('/login', validateJOI(loginSchema), login);
authRouter.get('/whoAmI', verifyToken, whoAmI);
authRouter.delete('/logout', logout);

// userRouter.get("/whoami", verifyToken, whoAmI);
// userRouter.get("/:id", verifyToken, getUser);
// userRouter.post("/signup", validateJOI(userSchema), signUp);
// userRouter.post("/login", login);
// userRouter.post("/logout", verifyToken, logout);
// userRouter.put("/:id", verifyToken, validateJOI(userSchema), updateUser);
// userRouter.delete("/:id", verifyToken, deleteUser);

export default authRouter;