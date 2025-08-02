import { z } from "zod";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password should have at least 6 symbols")
      .max(16, "Password shouldn't be longer than 16 symbols")
      .regex(
        /^(?=.*[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ])(?=.*\d).+$/,
        "Password should contain letters and numbers"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default resetPasswordSchema;
