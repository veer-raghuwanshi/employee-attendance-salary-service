import db from "../models";
import { v4 as uuid } from "uuid";

const User = db.User;
const Employee = db.Employee;

export const createEmployeeService = async (data: any) => {
  const { name, email, password, role, basicSalary, hra, allowances } = data;

  const existing = await User.findOne({ where: { email } });
  if (existing) throw new Error("Email already exists");

  const user = await User.create({
    publicId: uuid(),
    name,
    email,
    password,
    role,
  });

  const employee = await Employee.create({
    publicId: uuid(),
    userId: user.id,
    basicSalary,
    hra,
    allowances,
  });

  return { user, employee };
};

export const getEmployeeService = async (id: number) => {
  const employee = await Employee.findOne({
    where: { id },
    include: [{ model: db.User }],
  });

  if (!employee) throw new Error("Employee not found");

  return employee;
};
