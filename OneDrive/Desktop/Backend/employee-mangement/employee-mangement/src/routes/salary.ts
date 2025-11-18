import { Router } from "express";
import * as SalaryController from "../controllers/salary.controller";
import { auth } from "../middlewares/auth.middleware";
import { role } from "../middlewares/role.middleware";
import { salaryCalculateSchema } from "../validators/salary.validator";
import { validate } from "../middlewares/validate";
const router = Router();

// POST /salary/calculate  (HR/Admin)
router.post(
  "/calculate",
  auth,
  role(["admin", "hr"]),
  validate(salaryCalculateSchema),
  SalaryController.calculateSalary
);

// GET /salary/:employeeId?month=YYYY-MM
router.get(
  "/:employeeId",
  auth,
  SalaryController.getEmployeeSalary
);

export default router;
