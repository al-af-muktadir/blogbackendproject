import { z } from "zod";

const userValidationSchema = z.object({
  name: z.string(),
  email: z.string().email("Invalid EMail ADdress"),
  password: z.string(),
});
export const userValidation = { userValidationSchema };
