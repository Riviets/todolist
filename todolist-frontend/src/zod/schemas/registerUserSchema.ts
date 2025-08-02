import { z } from "zod";

const registerUserSchema = z.object({
  username: z
    .string()
    .min(3, "Username should have at least 3 symbols")
    .max(16, "Usernmae shouldn't be longer than 16 symbols"),
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

export default registerUserSchema;
