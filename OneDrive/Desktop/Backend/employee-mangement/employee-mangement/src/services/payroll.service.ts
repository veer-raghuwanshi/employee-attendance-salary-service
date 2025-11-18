import db from "../models";
import { v4 as uuid } from "uuid";

const Salary = db.Salary;
const Payroll = db.Payroll;

export const distributePayrollService = async (month: string) => {
  const salaries = await Salary.findAll({ where: { month } });

  const totalPayout = salaries.reduce(
    (sum: number, s: any) => sum + s.netSalary,
    0
  );

  const payroll = await Payroll.create({
    publicId: uuid(),
    month,
    gross: totalPayout,
    tax: 0,
    pf: 0,
    deductions: 0,
    net: totalPayout,
  });

  return payroll;
};

export const getPayrollHistoryService = async (month: string) => {
  const payroll = await Payroll.findOne({ where: { month } });
  if (!payroll) throw new Error("Payroll not found");

  return payroll;
};
