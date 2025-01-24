import { z } from "zod";

const loginValidationSchema = z.object({
  email: z.string({ required_error: "Email Required" }).email(),
  password: z.string(),
});

export const loginValidation = { loginValidationSchema };
