export type LandingVariantKey =
  | "crowdtolive-startup-bayuti"
  | "crowdtolive-charity-bayuti"
  | "crowdtolive-academy-bayuti"
  | "crowdtolive-case-studies";

export interface LandingVariantLink {
  key: LandingVariantKey;
  label: string;
  icon: string;
  href: string;
}

export type LandingHeroLayout = "splitCard" | "splitImpact" | "splitLeadForm" | "centered";

export interface LandingHeroStat {
  value: string;
  label: string;
}

export interface LandingHeroCardRow {
  label: string;
  value: string;
  sub?: string;
  gradientValue?: boolean;
}

export interface LandingHeroLeadFormField {
  label: string;
  placeholder?: string;
  type: "text" | "email" | "select";
  options?: string[];
}

export interface LandingHeroConfig {
  layout: LandingHeroLayout;
  badgeText?: string;
  badgeIcon?: string;
  breadcrumb?: { label: string; href?: string }[];
  title: string;
  titleGradientText?: string;
  subtitle: string;
  tags?: string[];
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  stats?: LandingHeroStat[];
  ratingBadgeText?: string;
  ratingStarsText?: string;
  cardRows?: LandingHeroCardRow[];
  leadForm?: {
    title: string;
    fields: LandingHeroLeadFormField[];
    submitLabel: string;
    note: string;
  };
}

export interface LandingNavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface LandingNavConfig {
  logo: { src: string; alt: string; href: string };
  links: LandingNavLink[];
  secondaryCta: { label: string; href: string; external?: boolean };
  primaryCta: { label: string; href: string };
}

export interface LandingFooterConfig {
  socialLinks: { label: string; href: string }[];
  legalText: string;
}

export interface LandingTrustItem {
  icon: string;
  text: string;
}

export type LandingSection =
  | {
      type: "backedBy";
      label: string;
      items: { icon: string; title: string; subtitle: string; accent?: string }[];
    }
  | {
      type: "numbers";
      title: string;
      items: { value: string; label: string }[];
    }
  | {
      type: "cards";
      id?: string;
      chip: string;
      chipTone?: "purple" | "green";
      title: string;
      subtitle: string;
      items: { icon: string; title: string; description: string }[];
      tone?: "light" | "dark";
    }
  | {
      type: "steps";
      id?: string;
      chip: string;
      title: string;
      items: { title: string; description: string; icon?: string }[];
      tone?: "light" | "dark";
      numbered?: boolean;
      eligibilityText?: string;
    }
  | {
      type: "institutions";
      id?: string;
      chip: string;
      chipTone?: "purple" | "green";
      title: string;
      subtitle: string;
      items: { icon: string; title: string; description: string }[];
    }
  | {
      type: "faq";
      id?: string;
      chip: string;
      title: string;
      subtitle?: string;
      items: { question: string; answer: string }[];
      tone?: "light" | "dark";
      grid?: boolean;
    }
  | {
      type: "cta";
      title: string;
      subtitle: string;
      ctaLabel: string;
      ctaHref: string;
      tone?: "gradient" | "darkGlow";
      note?: string;
    }
  | {
      type: "charityLogos";
      label: string;
      items: (
        | { type: "image"; src: string; alt: string; className?: string }
        | { type: "text"; name: string; subtitle?: string; tone?: "emerald" | "dark" | "purple" }
      )[];
    }
  | {
      type: "mission";
      id?: string;
      title: string;
      subtitle: string;
    }
  | {
      type: "story";
      id?: string;
      chip: string;
      title: string;
      starsText: string;
      quote: string;
      author: { initials: string; name: string; role: string; badge: string };
      note: string;
    }
  | {
      type: "trustBar";
      items: LandingTrustItem[];
      pill?: boolean;
    }
  | {
      type: "articles";
      id?: string;
      chip: string;
      title: string;
      subtitle: string;
      items: { badge: string; title: string; description: string; meta: string }[];
    }
  | {
      type: "whyGrid";
      id?: string;
      chip: string;
      title: string;
      subtitle: string;
      items: { icon: string; title: string; description: string }[];
    }
  | {
      type: "compare";
      id?: string;
      chip: string;
      title: string;
      headers: string[];
      rows: { cells: { text: string; tone?: "yes" | "no" | "best" }[] }[];
    }
  | {
      type: "trustpilot";
      id?: string;
      chip: string;
      title: string;
      subtitle: string;
      widget: {
        name: string;
        account: string;
        score: string;
        starsText: string;
        label: string;
        bars: { label: string; percent: string; width: string }[];
        ctaLabel: string;
        ctaHref: string;
      };
    }
  | {
      type: "reviews";
      id?: string;
      chip: string;
      title: string;
      subtitle: string;
      items: {
        featured?: boolean;
        starsText: string;
        quote: string;
        author: { initials: string; name: string; meta: string; badge: string };
      }[];
    }
  | {
      type: "credibility";
      id?: string;
      chip: string;
      title: string;
      subtitle: string;
      items: { icon: string; value: string; label: string }[];
    }
  | {
      type: "video";
      chip: string;
      title: string;
      subtitle: string;
      ctaLabel: string;
      ctaHref: string;
      ctaSubtitle: string;
    };

export interface LandingPageConfig {
  nav: LandingNavConfig;
  hero: LandingHeroConfig;
  sections: LandingSection[];
  footer: LandingFooterConfig;
  variantLinks: LandingVariantLink[];
}
