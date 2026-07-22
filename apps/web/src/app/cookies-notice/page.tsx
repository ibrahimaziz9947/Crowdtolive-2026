import type { Metadata } from "next";
import { LegalPage } from "@/features/legal/components/legal-page";

export const metadata: Metadata = { title: "Cookies Notice | CrowdToLive", description: "Bayuti cookies notice." };

export default function CookiesNoticeRoute() { return <LegalPage documentId="cookies" />; }
