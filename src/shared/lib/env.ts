import { z } from "zod";

const nonEmptyString = z.string().min(1);

export const schema = z.object({
  JWT_SECRET: nonEmptyString,
  YOUTUBE_API_KEY: nonEmptyString,
});

export const env = schema.parse(process.env);
