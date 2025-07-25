import { z } from "zod";

export const inputSchema = z.object({
  title: z.string().min(1, "This field can't be empty").max(36, "36 chars max"),
});
