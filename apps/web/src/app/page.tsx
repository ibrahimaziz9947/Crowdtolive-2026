import type { Metadata } from "next";
import { HomepageView } from "@/features/homepage";

export const metadata: Metadata = {
  title: "Homebuyer Registration | CrowdToLive",
  description:
    "Mortgage-free home ownership from just a 5% deposit through CrowdToLive's shared ownership model.",
};

export default function Home() {
  return <HomepageView />;
}
