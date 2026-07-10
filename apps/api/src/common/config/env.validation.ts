import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  APP_NAME: z.string().default("CrowdToLive API"),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  JWT_SECRET: z.string().min(16).default("change-this-admin-jwt-secret"),
  JWT_EXPIRES_IN: z.string().default("1d"),
  ADMIN_AUTH_COOKIE_NAME: z.string().default("crowdtolive_admin_token"),
  ADMIN_SEED_EMAIL: z.string().email().default("admin@crowdtolive.com"),
  ADMIN_SEED_PASSWORD: z.string().min(8).default("Admin@123456"),
  MONGODB_URI: z
    .string()
    .min(1)
    .default("mongodb://127.0.0.1:27017/crowdtolive"),
});

export type AppEnvironment = z.infer<typeof envSchema>;

export function validateEnvironment(config: Record<string, unknown>): AppEnvironment {
  return envSchema.parse(config);
}
