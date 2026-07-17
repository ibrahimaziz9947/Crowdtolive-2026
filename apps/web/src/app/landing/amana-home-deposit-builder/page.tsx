import type { Metadata } from "next";
import { AmanaLandingPage } from "@/features/amana-landing/components/amana-landing-page";

/*export const metadata: Metadata = {
  title: "Amana – Home Deposit Builder",
  description:
    "Amana by Bayuti helps homebuyers grow their home deposit through property-backed, FCA-regulated, Shariah-compliant investing.",
};

export default function AmanaHomeDepositBuilderPage() {
  return <AmanaLandingPage />;
} */


export const metadata: Metadata = {
  title: "Amana – Home Deposit Builder",
  description:
    "Amana by Bayuti helps homebuyers grow their home deposit through property-backed, FCA-regulated, Shariah-compliant investing.",

  openGraph: {
    title: "Amana – Home Deposit Builder",
    description:
      "Amana by Bayuti helps homebuyers grow their home deposit through property-backed, FCA-regulated, Shariah-compliant investing.",
    images: ["/images/amana-primary-color.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Amana – Home Deposit Builder",
    description:
      "Amana by Bayuti helps homebuyers grow their home deposit through property-backed, FCA-regulated, Shariah-compliant investing.",
    images: ["/images/amana-primary-color.png"],
  },
}; 

export default function AmanaHomeDepositBuilderPage() {
  return <AmanaLandingPage />;
}
