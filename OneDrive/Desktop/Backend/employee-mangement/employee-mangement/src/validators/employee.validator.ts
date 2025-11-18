import { z } from "zod";

export const createEmployeeSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(4),
    role: z.enum(["admin", "hr", "employee"]),
    basicSalary: z.number().positive(),
    hra: z.number().nonnegative(),
    allowances: z.number().nonnegative(),
  }),
});
