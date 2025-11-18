import { z } from "zod";

export const payrollSchema = z.object({
  body: z.object({
    month: z.string().regex(/^\d{4}-\d{2}$/),
  }),
});
