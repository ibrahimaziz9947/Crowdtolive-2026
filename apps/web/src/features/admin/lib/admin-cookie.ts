export function getAdminAuthCookieName() {
  return process.env.ADMIN_AUTH_COOKIE_NAME ?? "crowdtolive_admin_token";
}
