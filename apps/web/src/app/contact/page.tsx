import type { Metadata } from "next";
import { ContactPage } from "@/features/contact/components/contact-page";

export const metadata: Metadata = {
  title: "Contact | CrowdToLive",
  description: "Get in touch with the CrowdToLive team.",
};

export default function ContactRoute() {
  return <ContactPage />;
}
