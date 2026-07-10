import { cookies } from "next/headers";
import { getAdminAuthCookieName } from "./admin-cookie";
import { verifyAdminToken } from "./auth-shared";

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getAdminAuthCookieName())?.value;

  if (!token) {
    return null;
  }

  return verifyAdminToken(token);
}
