import { Router } from "express";
import * as AttendanceController from "../controllers/attendance.controller";
import { auth } from "../middlewares/auth.middleware";
import { role } from "../middlewares/role.middleware";
import { attendanceSchema } from "../validators/attendance.validator";
import { validate } from "../middlewares/validate";
const router = Router();

// POST /attendance/mark  (Employee)
router.post(
  "/mark",
  auth,
  role(["employee"]),
  validate(attendanceSchema),
  AttendanceController.markAttendance
);

export default router;
