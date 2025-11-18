import { z } from "zod";

export const attendanceSchema = z.object({
  body: z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    hoursWorked: z.number().min(0).max(24),
  }),
});
