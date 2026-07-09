import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPageView } from "@/features/landing/components/landing-page";
import { getLandingPage, landingVariantKeys } from "@/features/landing";

interface LandingVariantPageProps {
  params: Promise<{ variant: string }>;
}

export async function generateStaticParams() {
  return landingVariantKeys.map((variant) => ({ variant }));
}

export async function generateMetadata({
  params,
}: LandingVariantPageProps): Promise<Metadata> {
  const { variant } = await params;
  const config = getLandingPage(variant);

  if (!config) {
    return {
      title: "Landing Page Not Found",
    };
  }

  return {
    title: config.hero.title,
    description: config.hero.subtitle,
  };
}

export default async function LandingVariantPage({
  params,
}: LandingVariantPageProps) {
  const { variant } = await params;
  const config = getLandingPage(variant);

  if (!config) {
    notFound();
  }

  return <LandingPageView config={config} />;
}
