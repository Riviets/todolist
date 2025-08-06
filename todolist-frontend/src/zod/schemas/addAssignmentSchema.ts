import { z } from "zod";

const addAssignmentSchema = z.object({
  title: z
    .string()
    .min(1, "This field can't be empty")
    .max(32, "Title shouldnt be longer than 32 characters"),
  appointedDate: z.string(), //ТУТ ПОМІНЯТИ НА ДАТУ
});

export default addAssignmentSchema;
