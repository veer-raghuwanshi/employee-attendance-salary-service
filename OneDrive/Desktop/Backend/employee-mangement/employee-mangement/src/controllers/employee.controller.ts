import { Request, Response } from "express";
import db from "../models";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { AuthRequest } from "../middlewares/auth.middleware";

const Employee = db.Employee;
const User = db.User;

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, basicSalary, hra, allowances } =
      req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ msg: "Email already exists" });
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      publicId: uuid(),
      name,
      email,
      password: hashed,
      role,
    });

    const employee = await Employee.create({
      publicId: uuid(),
      userId: user.id,
      basicSalary,
      hra,
      allowances,
    });

    res.json({ msg: "Employee created", user, employee });
  } catch (err) {
    res.status(500).json({ msg: "Error creating employee", error: err });
  }
};

export const getEmployeeById = async (req: AuthRequest, res: Response) => {
  try {
    const employeeId = req.params.id;
    const requester = req.user!;

    // Employee role: restrict to only their own employee record
    if (requester.role === "employee") {
      const selfEmployee = await Employee.findOne({
        where: { userId: requester.id },
      });

      if (!selfEmployee) {
        return res.status(404).json({ msg: "Employee record not found" });
      }

      if (selfEmployee.id.toString() !== employeeId) {
        return res.status(403).json({
          msg: "You are not allowed to view this employee",
        });
      }
    }

    // HR/Admin can view any employee
    const employee = await Employee.findOne({
      where: { id: employeeId },
      include: [{ model: User, as: "user" }],
    });

    if (!employee) {
      return res.status(404).json({ msg: "Employee not found" });
    }

    res.json(employee);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error fetching employee", error: (err as any).message });
  }
};


