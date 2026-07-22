import type { Metadata } from "next";
import { LegalPage } from "@/features/legal/components/legal-page";

export const metadata: Metadata = { title: "Privacy Policy | CrowdToLive", description: "Bayuti privacy policy." };

export default function PrivacyPolicyRoute() { return <LegalPage documentId="privacy" />; }
