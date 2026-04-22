import { z } from "zod";

const nonEmptyString = z.string().min(1);

export const schema = z.object({
  SERVER_API_URL: nonEmptyString,
  JWT_SECRET: nonEmptyString,
});

export const env = schema.parse(process.env);
