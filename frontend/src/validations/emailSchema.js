import { z } from "zod";

export const emailSchema = z.object({
  to: z.string().email("Invalid Email"),
  subject: z.string().min(3, "Subject Required"),
  body: z.string().min(5, "Email body too short"),
  scheduledTime: z.string().min(1, "select date and Time"),
});
