import { z } from "zod";

export const authValidationSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});
