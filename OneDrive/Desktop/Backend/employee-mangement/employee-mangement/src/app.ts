import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Route Imports
import authRoutes from "./routes/auth";
import employeeRoutes from "./routes/employee";
import attendanceRoutes from "./routes/attendance";
import salaryRoutes from "./routes/salary";
import payrollRoutes from "./routes/payroll";
require("dotenv").config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", authRoutes);
app.use("/employees", employeeRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/salary", salaryRoutes);
app.use("/payroll", payrollRoutes);

// Not Found Handler
app.use((_: Request, res: Response) => {
  res.status(404).json({ msg: "Route not found" });
});

export default app;
