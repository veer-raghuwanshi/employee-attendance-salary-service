import db from "../models";
import { Op } from "sequelize";
import { v4 as uuid } from "uuid";

const Attendance = db.Attendance;
const Employee = db.Employee;
const Salary = db.Salary;

export const calculateSalaryService = async (
  employeeId: number,
  month: string
) => {
  const employee = await Employee.findByPk(employeeId);
  if (!employee) throw new Error("Employee not found");

  const attendance = await Attendance.findAll({
    where: { employeeId, date: { [Op.like]: `${month}-%` } },
  });

  const fullDays = attendance.filter((a: any) => a.hoursWorked >= 8).length;
  const halfDays = attendance.filter(
    (a: any) => a.hoursWorked < 8 && a.hoursWorked > 0
  ).length;

  const gross = employee.basicSalary + employee.hra + employee.allowances;
  const pf = employee.basicSalary * 0.12;

  let tax = 0;
  if (gross > 100000) tax = gross * 0.2;
  else if (gross > 60000) tax = gross * 0.1;
  else if (gross > 30000) tax = gross * 0.05;

  const daily = gross / 30;

  const total = fullDays * daily + halfDays * (daily / 2);
  const net = total - tax - pf;

  const salary = await Salary.create({
    publicId: uuid(),
    employeeId,
    month,
    grossSalary: gross,
    tax,
    pf,
    deductions: 0,
    netSalary: net,
  });

  return salary;
};

export const getEmployeeSalaryService = async (
  employeeId: number,
  month: string
) => {
  const salary = await Salary.findOne({ where: { employeeId, month } });
  if (!salary) throw new Error("Salary not found");
  return salary;
};
