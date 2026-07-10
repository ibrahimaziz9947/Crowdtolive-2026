import { redirect } from "next/navigation";
import { AdminDashboardView, getAdminSession } from "@/features/admin";

export const metadata = {
  title: "Admin Dashboard | CrowdToLive",
  description: "Protected admin dashboard for CrowdToLive operations.",
};

export default async function AdminDashboardPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return <AdminDashboardView session={session} />;
}
