import { z } from "zod";

const blogValidationSchema = z.object({
  title: z.string(),
  content: z.string(),
  author: z.string(),
  isPublished: z.boolean(),
});

export default blogValidationSchema;
