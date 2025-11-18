import { Router } from "express";
import * as PayrollController from "../controllers/payroll.controller";
import { auth } from "../middlewares/auth.middleware";
import { role } from "../middlewares/role.middleware";
import { payrollSchema } from "../validators/payroll.validator";
import { validate } from "../middlewares/validate";
const router = Router();

// POST /payroll/distribute  (HR/Admin)
router.post(
  "/distribute",
  auth,
  role(["admin", "hr"]),
  validate(payrollSchema),
  PayrollController.distributePayroll
);

// GET /payroll/history?month=YYYY-MM
router.get(
  "/history",
  auth,
  role(["admin", "hr"]),
  PayrollController.getPayrollHistory
);

export default router;
