import db from "../models";
import { v4 as uuid } from "uuid";

const Attendance = db.Attendance;

export const markAttendanceService = async (
  employeeId: number,
  date: string,
  hoursWorked: number
) => {
  return await Attendance.create({
    publicId: uuid(),
    employeeId,
    date,
    hoursWorked,
  });
};
