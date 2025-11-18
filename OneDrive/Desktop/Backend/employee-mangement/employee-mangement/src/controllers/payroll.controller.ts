import { Request, Response } from "express";
import db from "../models";
import { v4 as uuid } from "uuid";
import { Op } from "sequelize";

const Salary = db.Salary;
const Payroll = db.Payroll;
const Employee = db.Employee;
const User = db.User;

export const distributePayroll = async (req: Request, res: Response) => {
  try {
    const { month } = req.body;

    const salaries = await Salary.findAll({ where: { month } });

    if (salaries.length === 0)
      return res.status(404).json({ msg: "No salary for this month" });

    const payrollList = [];

    for (const sal of salaries) {
      const payroll = await Payroll.create({
        publicId: uuid(),
        employeeId: sal.employeeId,
        month,
        gross: sal.grossSalary,
        tax: sal.tax,
        pf: sal.pf,
        deductions: sal.deductions,
        net: sal.netSalary,
      });

      payrollList.push(payroll);
    }

    return res.json({ msg: "Payroll distributed", payrollList });
  } catch (err) {
    return res.status(500).json({ msg: "Payroll error", error: err });
  }
};


export const getPayrollHistory = async (req: Request, res: Response) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res
        .status(400)
        .json({ msg: "Month is required in YYYY-MM format" });
    }

    // Convert to DATEONLY format (YYYY-MM → YYYY-MM-01)
    const formattedMonth = `${month}-01`;

    const payrolls = await Payroll.findAll({
      where: { month: formattedMonth },
      include: [
        {
          model: Employee,
          as: "employee",
          include: [{ model: User, as: "user" }],
        },
      ],
    });

    if (!payrolls.length) {
      return res
        .status(404)
        .json({ msg: "No payroll records found for this month" });
    }

    res.json({
      month,
      count: payrolls.length,
      payrolls,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching payroll history", error: err });
  }
};

