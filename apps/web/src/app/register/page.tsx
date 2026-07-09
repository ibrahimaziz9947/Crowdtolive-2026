import { RegistrationWizard } from "@/features/registration-qualification";

export const metadata = {
  title: "Registration Qualification | CrowdToLive",
  description: "Registration qualification flow for CrowdToLive homebuyer journey.",
};

export default function RegisterPage() {
  return <RegistrationWizard />;
}
