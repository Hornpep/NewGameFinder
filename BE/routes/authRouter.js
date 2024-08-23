import {Router} from 'express';
import validateJOI from '../middlewares/validateJOI';
import verifyToken from '../middlewares/verifyToken';
import {loginSchema, signinSchema} from '../validations/schemas';
import {signup, login, whoAmI, logout} from '../controllers/auth.js';

export default authRouter = Router();

authRouter.post('/signup', validateJOI(signinSchema), signup);
authRouter.post('/login', validateJOI(loginSchema), login);
authRouter.get('/whoami', verifyToken, whoAmI);
authRouter.delete('/logout', logout);