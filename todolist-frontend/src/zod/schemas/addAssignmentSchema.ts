import { z } from "zod";

const addAssignmentSchema = z.object({
  title: z.string().min(1).max(32),
  appointedDate: z.string(), //ТУТ ПОМІНЯТИ НА ДАТУ
});

export default addAssignmentSchema;
