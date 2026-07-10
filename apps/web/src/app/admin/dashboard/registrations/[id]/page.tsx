import { redirect } from "next/navigation";
import { RegistrationDetailsView } from "@/features/admin";
import { getAdminSession } from "@/features/admin";

export const metadata = {
  title: "Registration Details | CrowdToLive Admin",
  description: "Review and manage an individual registration in the CrowdToLive admin.",
};

export default async function AdminRegistrationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;

  return <RegistrationDetailsView session={session} registrationId={id} />;
}
