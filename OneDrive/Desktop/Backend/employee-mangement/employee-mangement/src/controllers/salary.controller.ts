import { Request, Response } from "express";
import db from "../models";
import { v4 as uuid } from "uuid";
import { Op } from "sequelize";

const Attendance = db.Attendance;
const Employee = db.Employee;
const Salary = db.Salary;

export const calculateSalary = async (req: Request, res: Response) => {
  try {
    const { employeeId, month } = req.body;

    const employee = await Employee.findByPk(employeeId);
    if (!employee) return res.status(404).json({ msg: "Employee not found" });
    const start = `${month}-01`;
    const end = `${month}-31`;
    // Fetch attendance for the month
    const attendance = await Attendance.findAll({
      where: {
        employeeId,
        date: {
          [Op.between]: [start, end],
        },
      },
    });
      console.log(attendance);
    const fullDays = attendance.filter((a: any) => a.hoursWorked >= 8).length;
    const halfDays = attendance.filter(
      (a: any) => a.hoursWorked > 0 && a.hoursWorked < 8
    ).length;

    // Salary components
    const gross = employee.basicSalary + employee.hra + employee.allowances;

    let taxRate = 0;
    if (gross > 100000) taxRate = 0.2;
    else if (gross > 60000) taxRate = 0.1;
    else if (gross > 30000) taxRate = 0.05;

    const daily = gross / 30;

    const earnedSalary = fullDays * daily + halfDays * (daily / 2);

    const factor = earnedSalary / gross;

    const pf = employee.basicSalary * 0.12 * factor;
    const tax = gross * taxRate * factor;

    const net = Math.max(earnedSalary - tax - pf, 0);

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

    return res.json({ msg: "Salary calculated", salary });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Error calculating salary", error: err });
  }
};

export const getEmployeeSalary = async (req: Request, res: Response) => {
  try {
    const { employeeId } = req.params;
    const { month } = req.query;

    const salary = await Salary.findOne({
      where: { employeeId, month },
    });

    if (!salary) return res.status(404).json({ msg: "Salary not found" });

    res.json(salary);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching salary", error: err });
  }
};
