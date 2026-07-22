import type { Metadata } from "next";
import { LegalPage } from "@/features/legal/components/legal-page";

export const metadata: Metadata = { title: "Terms of Use | CrowdToLive", description: "Bayuti investor terms and conditions." };

export default function TermsOfUseRoute() { return <LegalPage documentId="terms" />; }
