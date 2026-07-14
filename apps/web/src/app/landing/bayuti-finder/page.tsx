import type { Metadata } from "next";
import { BayutiFinderPage } from "@/features/bayuti-finder/components/bayuti-finder-page";

export const metadata: Metadata = {
  title: "Bayuti Finder",
  description:
    "Find homes within your alternative financing range by verifying the email used for your CrowdToLive qualification form.",
};

export default function BayutiFinderLandingPage() {
  return <BayutiFinderPage />;
}
