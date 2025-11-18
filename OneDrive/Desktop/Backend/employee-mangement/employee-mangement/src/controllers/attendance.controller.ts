import { AuthRequest } from "../middlewares/auth.middleware";
import { Request, Response } from "express";
import db from "../models";
import { v4 as uuid } from "uuid";

const Attendance = db.Attendance;

export const markAttendance = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const { date, hoursWorked } = req.body;
    const employeeId = req.user.id;

    const attendance = await Attendance.create({
      publicId: uuid(),
      employeeId,
      date,
      hoursWorked,
    });

    res.json({ msg: "Attendance marked", attendance });
  } catch (err) {
    res.status(500).json({ msg: "Error marking attendance", error: err });
  }
};
