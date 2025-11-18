import { Router } from "express";
import * as AuthController from "../controllers/auth.controller";
import { loginSchema } from "../validators/auth.validator";
import { validate } from "../middlewares/validate";
const router = Router();

// POST /auth/login
router.post("/login", validate(loginSchema), AuthController.login);

// POST /auth/logout
router.post("/logout", AuthController.logout);

export default router;
