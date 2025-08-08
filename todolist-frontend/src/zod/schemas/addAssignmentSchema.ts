import { z } from "zod";

const addAssignmentSchema = z.object({
  title: z
    .string()
    .min(1, "This field can't be empty")
    .max(32, "Title shouldnt be longer than 32 characters"),
  appointedDate: z
    .string()
    .refine(
      (val) => /^\d{4}-\d{2}-\d{2}$/.test(val),
      "Date must be in format YYYY-MM-DD"
    ),
});

export default addAssignmentSchema;
