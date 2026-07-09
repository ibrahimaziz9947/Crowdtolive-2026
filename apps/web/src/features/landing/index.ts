import type { LandingPageConfig, LandingVariantKey } from "./types";
import {
  landingCharity,
  landingSeo,
  landingStartup,
  landingTestimonials,
} from "./variants";

export const landingPages: Record<LandingVariantKey, LandingPageConfig> = {
  "crowdtolive-startup-bayuti": landingStartup,
  "crowdtolive-charity-bayuti": landingCharity,
  "crowdtolive-academy-bayuti": landingSeo,
  "crowdtolive-case-studies": landingTestimonials,
};

export function getLandingPage(variant: string): LandingPageConfig | null {
  if (variant in landingPages) {
    return landingPages[variant as LandingVariantKey];
  }

  return null;
}

export const landingVariantKeys = Object.keys(landingPages) as LandingVariantKey[];
