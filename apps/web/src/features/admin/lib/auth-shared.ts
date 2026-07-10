import { jwtVerify } from "jose";

export interface AdminSession {
  sub: string;
  email: string;
  role: string;
}

function getJwtSecret() {
  const secret = process.env.JWT_SECRET ?? "change-this-admin-jwt-secret";

  return new TextEncoder().encode(secret);
}

export async function verifyAdminToken(token: string): Promise<AdminSession | null> {
  const secret = getJwtSecret();

  if (!secret) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    if (
      typeof payload.sub !== "string" ||
      typeof payload.email !== "string" ||
      typeof payload.role !== "string"
    ) {
      return null;
    }

    return {
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  } catch {
    return null;
  }
}
