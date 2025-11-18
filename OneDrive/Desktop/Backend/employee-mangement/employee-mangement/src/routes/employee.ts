import { Router } from "express";
import * as EmployeeController from "../controllers/employee.controller";
import { auth } from "../middlewares/auth.middleware";
import { role } from "../middlewares/role.middleware";
import { createEmployeeSchema } from "../validators/employee.validator";
import { validate } from "../middlewares/validate";

const router = Router();

// POST /employees  (HR/Admin)
router.post(
  "/",
  auth,
  role(["admin", "hr"]),
  validate(createEmployeeSchema),
  EmployeeController.createEmployee
);

// GET /employees/:id  (HR/Admin or Self)
router.get(
  "/employees/:id",
  auth,
  role(["admin", "hr", "employee"]),
  EmployeeController.getEmployeeById
);

export default router;
