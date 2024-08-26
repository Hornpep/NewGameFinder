import { Router } from 'express';
import validateJOI from '../middlewares/validateJOI.js';
import verifyToken from '../middlewares/verifyToken.js';
import { loginSchema, signupSchema } from '../validations/schemas.js';
import { signup, login, whoAmI, logout } from '../controllers/auth.js';

export default authRouter = Router();

authRouter.post('/signup', validateJOI(signupSchema), signup);
authRouter.post('/login', validateJOI(loginSchema), login);
authRouter.get('/whoAmI', verifyToken, whoAmI);
authRouter.delete('/logout', logout);