import { z } from "zod";

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, "Password should have at least 6 symbols")
    .max(16, "Password shouldn't be longer than 16 symbols")
    .regex(
      /^(?=.*[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ])(?=.*\d).+$/,
      "Password should contain letters and numbers"
    ),
});

export default loginUserSchema;
