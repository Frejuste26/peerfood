import { Router } from 'express';
import Authentication from "../Controllers/Authentication.js";

const AuthRouter = Router();

// Group authentication routes under "/auth"
AuthRouter.post('/register', Authentication.Register);
AuthRouter.post('/login', Authentication.Login);

export default AuthRouter;
