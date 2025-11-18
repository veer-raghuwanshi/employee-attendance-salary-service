import { z } from "zod";

export const salaryCalculateSchema = z.object({
  body: z.object({
    employeeId: z.number().positive(),
    month: z.string().regex(/^\d{4}-\d{2}$/), // YYYY-MM
  }),
});
