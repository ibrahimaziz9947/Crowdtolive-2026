import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  APP_NAME: z.string().default("CrowdToLive API"),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  MONGODB_URI: z
    .string()
    .min(1)
    .default("mongodb://127.0.0.1:27017/crowdtolive"),
});

export type AppEnvironment = z.infer<typeof envSchema>;

export function validateEnvironment(config: Record<string, unknown>): AppEnvironment {
  return envSchema.parse(config);
}
