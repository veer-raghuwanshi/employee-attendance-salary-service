import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export const role = (roles: Array<"admin" | "hr" | "employee">) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: "Access denied" });
    }

    next();
  };
};
