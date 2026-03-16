import { z } from "zod";

export const SignupRequsetSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const SignupResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    accessToken: z.string(),
  }),
});

export type SignupRequest = z.infer<typeof SignupRequsetSchema>;
export type SignupResponse = z.infer<typeof SignupResponseSchema>;
