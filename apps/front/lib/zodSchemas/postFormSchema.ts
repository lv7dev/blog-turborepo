import { z } from "zod";

const OptionalImageFileSchema = z.preprocess(
  (value) => {
    if (value instanceof File && value.size === 0) {
      return undefined;
    }

    return value;
  },
  z.instanceof(File).optional(),
);

export const PostFormSchema = z.object({
  postId: z.preprocess(
    (value) => (value === "" || value == null ? undefined : Number(value)),
    z.number().int().positive().optional(),
  ),
  title: z.string().min(5).max(100),
  content: z.string().min(20),
  tags: z
    .string()
    .min(1)
    .refine((value) => value.split(",").every((tag) => tag.trim() !== ""))
    .transform((value) => value.split(",").map((tag) => tag.trim())),
  thumbnail: OptionalImageFileSchema,
  published: z.preprocess((value) => value === "on", z.boolean()),
});
