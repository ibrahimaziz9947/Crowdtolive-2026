import type { FeatureModuleDefinition } from "@crowdtolive/shared";

export const featureModules: FeatureModuleDefinition[] = [
  {
    key: "auth",
    label: "Authentication",
    description: "Reserved for login, session management, guards, and access policies.",
  },
  {
    key: "registration",
    label: "Registration",
    description: "Reserved for onboarding flows, applicant intake, and workflow orchestration.",
  },
  {
    key: "users",
    label: "Users",
    description: "Reserved for profile management, account preferences, and user dashboards.",
  },
  {
    key: "properties",
    label: "Properties",
    description: "Reserved for listings, portfolio management, and property metadata.",
  },
  {
    key: "documents",
    label: "Documents",
    description: "Reserved for uploads, document metadata, and review workflows.",
  },
  {
    key: "admin",
    label: "Admin",
    description: "Reserved for moderation, reporting, and operational controls.",
  },
];
