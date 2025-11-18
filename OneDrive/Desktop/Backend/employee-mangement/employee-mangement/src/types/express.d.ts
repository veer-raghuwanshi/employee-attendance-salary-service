import "express";

declare global {
  namespace Express {
    interface User {
      id: number;
      role: "admin" | "hr" | "employee";
    }

    interface Request {
      user?: User;
    }
  }
}

export {};
