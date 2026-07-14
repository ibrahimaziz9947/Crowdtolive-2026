import type {
  LandingFooterConfig,
  LandingNavConfig,
  LandingPageConfig,
  LandingVariantLink,
} from "./types";

const variantLinks: LandingVariantLink[] = [
  {
    key: "crowdtolive-startup-bayuti",
    icon: "🚀",
    label: "Startup Unicorn",
    href: "/landing/crowdtolive-startup-bayuti",
  },
  {
    key: "crowdtolive-charity-bayuti",
    icon: "💚",
    label: "Charity and Social",
    href: "/landing/crowdtolive-charity-bayuti",
  },
  {
    key: "crowdtolive-academy-bayuti",
    icon: "🔍",
    label: "SEO",
    href: "/landing/crowdtolive-academy-bayuti",
  },
  {
    key: "crowdtolive-case-studies",
    icon: "⭐",
    label: "Testimonials",
    href: "/landing/crowdtolive-case-studies",
  },
];

const navBase: LandingNavConfig = {
  logo: {
    src: "https://crowdtolive.bayuti.com/wp-content/uploads/2025/12/Crowdtolive-W-R-2.png",
    alt: "CrowdToLive by Bayuti",
    href: "/",
  },
  links: [
    { label: "Home", href: "https://crowdtolive.bayuti.com", external: true },
    { label: "Homebuyer Registration", href: "/register" },
    { label: "Property Finder", href: "https://crowdtolive.bayuti.com", external: true },
    { label: "Deposit Builder", href: "https://crowdtolive.bayuti.com", external: true },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact Us", href: "/#contact" },
  ],
  secondaryCta: {
    label: "Invest in Properties",
    href: "https://crowdtolive.bayuti.com",
    external: true,
  },
  primaryCta: { label: "Buy a Home", href: "/register" },
};

const footerBase: LandingFooterConfig = {
  socialLinks: [
    { label: "Facebook", href: "https://www.facebook.com/bayutiofficial/" },
    { label: "YouTube", href: "https://www.youtube.com/@Bayuti_Official" },
    { label: "Instagram", href: "https://www.instagram.com/bayuti_official" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/bayuti" },
    { label: "TikTok", href: "https://www.tiktok.com/@bayutiofficial" },
  ],
  legalText:
    "Crowdtolive is a registered trading name of Elite Capital and Management Services Limited, authorised and regulated by the Financial Conduct Authority (Reference Number: 822039). Company number: 10347767. Registered in England and Wales. 809 Salisbury House, 29 Finsbury Circus, London EC2M 7AQ.",
};

export const landingStartup: LandingPageConfig = {
  nav: navBase,
  hero: {
    layout: "splitCard",
    badgeText: "UK's #1 Islamic Home Finance Platform",
    title: "The Startup Disrupting Home Ownership for Muslim Families",
    titleGradientText: "Disrupting",
    subtitle:
      "No mortgage, no interest, no compromise on your values. CrowdToLive is FCA regulated, Shariah certified, and backed by serious financial institutions. Start with just 5% deposit.",
    primaryCta: { label: "Start in 1 Minute", href: "/register" },
    secondaryCta: { label: "See How It Works", href: "#how" },
    stats: [
      { value: "5%", label: "Min Deposit" },
      { value: "0%", label: "Interest" },
      { value: "FCA", label: "Regulated" },
    ],
    cardRows: [
      { label: "Deposit needed", value: "5%", sub: "of the property price" },
      { label: "Interest charged", value: "Zero", sub: "Shariah compliant, always" },
      { label: "Time to register", value: "Under 1 min", sub: "No credit check to start" },
      { label: "FCA Reference", value: "822039", sub: "Fully authorised and regulated" },
    ],
  },
  sections: [
    {
      type: "backedBy",
      label: "Backed by",
      items: [
        { icon: "✦", title: "Virgin", subtitle: "StartUp", accent: "#e4002b" },
        { icon: "🦅", title: "Barclays", subtitle: "Eagle Labs", accent: "#00aeef" },
        { icon: "🏙️", title: "London", subtitle: "and Partners", accent: "#e4002b" },
        { icon: "🏠", title: "REACH", subtitle: "Accelerating Real Estate UK", accent: "#003087" },
        { icon: "🔷", title: "NatWest", subtitle: "Banking Partner", accent: "#4b006e" },
        { icon: "💎", title: "Second Century", subtitle: "Ventures", accent: "#1a1a2e" },
      ],
    },
    {
      type: "numbers",
      title: "CrowdToLive in Numbers",
      items: [
        { value: "+16,000", label: "Registered users" },
        { value: "+6,000", label: "Properties submitted" },
        { value: "£965M", label: "Worth of properties processed" },
        { value: "+100", label: "Years of joint experience in key areas" },
      ],
    },
    {
      type: "cards",
      id: "why",
      chip: "Why CrowdToLive",
      title: "Not a Mortgage. A Movement.",
      subtitle:
        "We built CrowdToLive from the ground up for British Muslim families who refuse to pick between their faith and a home of their own.",
      items: [
        {
          icon: "🕌",
          title: "Shariah Compliant by Design",
          description:
            "Our model uses Musharakah Mutanaqisah (diminishing partnership), certified by a dedicated Shariah Supervisory Board. Zero riba, always.",
        },
        {
          icon: "🚀",
          title: "Fintech, Not a Bank",
          description:
            "We use technology to make Islamic home finance fast, clear, and transparent. No confusing clauses, no branch visits, no bank required.",
        },
        {
          icon: "🏦",
          title: "Institutionally Backed",
          description:
            "FCA authorised (Ref: 822039). Operated by Elite Capital and Management Services Limited, a registered UK financial services firm since 2016.",
        },
        {
          icon: "📈",
          title: "Grow at Your Own Pace",
          description:
            "Buy more shares every 3 months, with no minimum or ceiling. Your rent drops as your ownership grows. Full control, your way.",
        },
        {
          icon: "🔐",
          title: "Full Legal Protection",
          description:
            "Your ownership share is legally registered in England. You get the same rights as any homeowner from day one.",
        },
        {
          icon: "🌍",
          title: "Built for British Muslims",
          description:
            "We get the unique challenges Muslim families face here in the UK. Our team, our model, and our values are aligned with yours.",
        },
      ],
    },
    {
      type: "steps",
      id: "how",
      chip: "The Process",
      title: "How It Works in 3 Simple Steps",
      tone: "dark",
      numbered: true,
      items: [
        {
          title: "Choose Your Home",
          description:
            "Share the property link or address. Once approved, pay your deposit and get your first ownership share.",
        },
        {
          title: "Move In Straight Away",
          description:
            "You live in your home from day one. Pay rent only on the portion you don't yet own, not the whole property.",
        },
        {
          title: "Grow Your Ownership",
          description:
            "Buy more shares every 3 months. As your share grows, your rent falls, until you own it outright.",
        },
      ],
    },
    {
      type: "institutions",
      id: "compliance",
      chip: "Institutional Trust",
      chipTone: "green",
      title: "Backed by the Frameworks That Matter",
      subtitle:
        "Islamic finance is one of the fastest growing sectors in global finance. CrowdToLive sits right at the intersection of faith and fintech.",
      items: [
        {
          icon: "🇬🇧",
          title: "FCA Regulated",
          description: "Authorised by the Financial Conduct Authority. Reference number 822039.",
        },
        {
          icon: "🌙",
          title: "Shariah Compliant",
          description:
            "Certified interest-free model based on Islamic diminishing partnership principles.",
        },
        {
          icon: "🏢",
          title: "Companies House",
          description: "Registered in England and Wales. Company number 10347767.",
        },
        {
          icon: "🤝",
          title: "Elite Capital",
          description:
            "Backed by Elite Capital and Management Services, a London-based financial services group.",
        },
      ],
    },
    {
      type: "faq",
      id: "faq",
      chip: "FAQ",
      title: "Questions, Answered Honestly",
      items: [
        { question: "💰 How much deposit do I need?", answer: "Just 5% of the property price. No higher requirements for being a Muslim applicant." },
        { question: "🕌 Is it truly Shariah compliant?", answer: "Yes. Our model is Musharakah Mutanaqisah, endorsed globally across Islamic finance. Zero interest, zero riba." },
        { question: "⏳ Is there a waiting list?", answer: "No waiting list. Register in under 1 minute and we'll get started." },
        { question: "📈 Can I grow my ownership share?", answer: "Yes, with no ceiling. You can increase your share every 3 months, as much or as little as you like." },
        { question: "⚖️ Who covers stamp duty and legal fees?", answer: "Costs are split proportionally between you and CrowdToLive based on ownership at the time of purchase." },
        { question: "🏠 Which properties are accepted?", answer: "Freehold houses and standard builds across England. Register to check your area." },
      ],
    },
    {
      type: "cta",
      title: "Own Your Home the Halal Way",
      subtitle:
        "Join Muslim families across England building their future without compromising their faith. Under 1 minute to start.",
      ctaLabel: "Start Your Journey Today",
      ctaHref: "/register",
      tone: "gradient",
    },
  ],
  footer: footerBase,
  variantLinks,
};

export const landingCharity: LandingPageConfig = {
  nav: navBase,
  hero: {
    layout: "splitImpact",
    badgeText: "A social enterprise with purpose",
    badgeIcon: "🌱",
    title: "Every Family Deserves a Home They Actually Own",
    titleGradientText: "Actually Own",
    subtitle:
      "CrowdToLive was founded on one belief: homeownership shouldn't be locked behind debt and interest. We're here to help families, especially those shut out by the traditional mortgage system, build a stable and secure future.",
    primaryCta: { label: "Begin Your Journey", href: "/register" },
    secondaryCta: { label: "Our Mission", href: "#mission" },
    cardRows: [
      { label: "Deposit needed", value: "5%", sub: "of the property price", gradientValue: true },
      { label: "Interest charged", value: "£0", sub: "Zero, ever", gradientValue: true },
      {
        label: "Our promise",
        value: "Helping families own their home without compromising their values or finances.",
      },
    ],
  },
  sections: [
    {
      type: "charityLogos",
      label: "Charity and Waqf Partners",
      items: [
        {
          type: "image",
          src: "/partners/eman-legacy.svg",
          alt: "Eman Legacy",
          className: "max-h-12 max-w-[168px]",
        },
        {
          type: "image",
          src: "https://nzf.org.uk/wp-content/uploads/2020/02/Logo.svg",
          alt: "National Zakat Foundation",
        },
        {
          type: "image",
          src: "https://cdn.prod.website-files.com/6536a97cd387cdb7dd3519d9/656fb482dd8f0b60a30ddefc_logo.svg",
          alt: "National Waqf",
          className: "max-h-10",
        },
        {
          type: "image",
          src: "https://www.mwnuk.co.uk/images/mwnuklogo_new.png",
          alt: "Muslim Women's Network UK",
        },
        {
          type: "image",
          src: "https://www.crisis.org.uk/Content/images/logo_crisis_red_2023.png",
          alt: "Crisis",
        },
        {
          type: "image",
          src: "/partners/human-appeal.svg.png",
          alt: "Human Appeal",
          className: "max-h-14 max-w-[92px]",
        },
      ],
    },
    {
      type: "mission",
      id: "mission",
      title:
        "Millions of British Muslim families can't get a mortgage without going against their faith. We fix that.",
      subtitle:
        "Through an ethical, Shariah compliant shared ownership model, CrowdToLive opens the door to homeownership for families who've been left behind by the system for too long.",
    },
    {
      type: "cards",
      id: "impact",
      chip: "Social Impact",
      title: "Changing Lives Through Ethical Finance",
      subtitle:
        "Every home we help a family own is a step toward generational wealth, community stability, and real financial independence.",
      items: [
        {
          icon: "🏡",
          title: "Stable Homes, Stable Families",
          description:
            "Homeownership is the foundation of family stability. CrowdToLive helps parents give their children a permanent home, not a rented room.",
        },
        {
          icon: "💚",
          title: "Ethical Financial Inclusion",
          description:
            "We serve communities excluded by traditional banking. No interest, no riba. Just a fair path to the home you've worked hard for.",
        },
        {
          icon: "📚",
          title: "Financial Education",
          description:
            "We empower families with the knowledge to make informed decisions. Transparency is at the heart of everything we do.",
        },
        {
          icon: "🌍",
          title: "Community Impact",
          description:
            "When families own their homes, whole communities thrive. We're building stronger neighbourhoods, one home at a time.",
        },
      ],
    },
    {
      type: "numbers",
      title: "Impact in Numbers",
      items: [
        { value: "5%", label: "Minimum deposit needed" },
        { value: "0%", label: "Interest, ever" },
        { value: "3 mo", label: "Earliest you can grow your share" },
        { value: "All England", label: "Coverage area" },
      ],
    },
    {
      type: "story",
      id: "stories",
      chip: "Real Stories",
      title: "Families We've Helped",
      starsText: "★★★★★",
      quote:
        "My husband and I would like to sincerely thank Pankaj for his incredible support throughout our entire home buying journey. From start to finish he went above and beyond to guide us through every stage with patience and care. There were moments when it felt like nothing was moving forward, but Pankaj always remained calm, reassuring, and positive. His communication was excellent and he always took time to explain everything clearly, which really helped ease our stress as first time buyers. He's genuinely kind and caring, and we felt supported the whole way through. We're extremely grateful and would highly recommend his service to anyone!",
      author: {
        initials: "F",
        name: "Fatima",
        role: "First Time Homebuyer, CrowdToLive Customer",
        badge: "✅ Verified Review",
      },
      note: "Every story starts with one step. Yours could be next.",
    },
    {
      type: "steps",
      id: "how",
      chip: "How It Works",
      title: "Three Steps to Your Own Home",
      numbered: true,
      items: [
        {
          title: "Choose Your Property",
          description:
            "Share the address or link of the home you want. We review it and confirm eligibility for your area.",
        },
        {
          title: "Pay Your Deposit and Move In",
          description:
            "With as little as 5% deposit you get your first ownership share and move in right away. You only pay rent on the part you don't yet own.",
        },
        {
          title: "Build Your Ownership Over Time",
          description:
            "Every 3 months you can buy more of your home. As your share grows, your rent falls, until the home is fully yours.",
        },
      ],
      eligibilityText: "✅ Accepted: Freehold properties, houses, standard builds across England",
    },
    {
      type: "faq",
      id: "faq",
      chip: "FAQ",
      title: "Answers to What Families Ask Most",
      grid: true,
      items: [
        {
          question: "How little can I start with?",
          answer:
            "Just 5% of the property's purchase price. That's significantly less than many families save for years hoping to afford.",
        },
        {
          question: "Is there any interest charged?",
          answer: "None. Zero. Our model is built on Shariah principles, no interest, no riba, no compromise.",
        },
        {
          question: "Do I need a perfect credit score?",
          answer:
            "We assess affordability fairly and holistically. Register to start a conversation about your specific situation.",
        },
        { question: "Is there a waiting list?", answer: "No waiting list. If you're ready to take the first step, so are we." },
      ],
    },
    {
      type: "cta",
      title: "A Home is More Than Bricks. It's a Future.",
      subtitle:
        "Join families across England building their future the ethical, interest free way. Takes less than 1 minute to begin.",
      ctaLabel: "Start Your Journey, It's Free",
      ctaHref: "/register",
      tone: "darkGlow",
    },
  ],
  footer: footerBase,
  variantLinks,
};

export const landingSeo: LandingPageConfig = {
  nav: navBase,
  hero: {
    layout: "splitLeadForm",
    breadcrumb: [{ label: "Home" }, { label: "Islamic Home Finance UK" }],
    title: "The UK's #1 Islamic Home Finance Platform. No Mortgage, No Interest.",
    titleGradientText: "Islamic Home Finance",
    subtitle:
      "CrowdToLive is the UK's leading Shariah compliant home purchase platform. Buy a property across England with as little as a 5% deposit, with zero interest, zero riba, and full FCA regulation.",
    tags: [
      "✅ FCA Regulated #822039",
      "🕌 Shariah Compliant",
      "🏡 5% Deposit",
      "🇬🇧 England Wide",
      "💰 Zero Interest",
    ],
    primaryCta: { label: "Get Started, It's Free", href: "/register" },
    stats: [
      { value: "5%", label: "Min Deposit" },
      { value: "0%", label: "Interest" },
      { value: "1 min", label: "To Register" },
    ],
    leadForm: {
      title: "🏡 Start Your Free Registration",
      fields: [
        { label: "Full Name", placeholder: "Your full name", type: "text" },
        { label: "Email Address", placeholder: "your@email.com", type: "email" },
        {
          label: "Property Budget",
          type: "select",
          options: ["Under £200,000", "£200,000 to £350,000", "£350,000 to £500,000", "£500,000+"],
        },
        { label: "Location", placeholder: "e.g. Birmingham, Manchester", type: "text" },
      ],
      submitLabel: "Get Started, It's Free",
      note: "No credit check to register. FCA regulated.",
    },
  },
  sections: [
    {
      type: "trustBar",
      items: [
        { icon: "🏛️", text: "FCA Authorised (Ref: 822039)" },
        { icon: "🕌", text: "Shariah Board Certified" },
        { icon: "🏢", text: "Companies House: 10347767" },
        { icon: "🔒", text: "Legally Protected Ownership" },
        { icon: "🇬🇧", text: "Available Across England" },
      ],
    },
    {
      type: "articles",
      id: "articles",
      chip: "Expert Guides",
      title: "Learn Everything About Islamic Home Finance in the UK",
      subtitle:
        "Our resource library covers everything Muslim families need to know about buying a home without a mortgage.",
      items: [
        {
          badge: "Islamic Finance",
          title: "What is Islamic Home Finance? A Complete UK Guide for 2025",
          description:
            "Understand the difference between a conventional mortgage and a Shariah compliant home purchase model. Learn how Musharakah Mutanaqisah works and why it matters.",
          meta: "📖 8 min read · Islamic Finance Basics",
        },
        {
          badge: "Halal Mortgage",
          title: "Halal Mortgage Alternatives UK: Everything You Need to Know",
          description:
            "A deep dive into the options available for Muslim homebuyers in the UK who want to avoid interest based lending. We compare all available products.",
          meta: "📖 10 min read · Market Comparison",
        },
        {
          badge: "Shariah",
          title: "Is Shared Ownership Halal? What UK Muslims Need to Know",
          description:
            "Government shared ownership schemes have limitations for Muslim buyers. CrowdToLive's model is purpose built to be fully Shariah compliant. Here's the difference.",
          meta: "📖 6 min read · Shariah Law",
        },
        {
          badge: "Buying Guide",
          title: "How to Buy a Home with 5% Deposit Using Islamic Finance",
          description:
            "Step by step guide to using CrowdToLive to purchase your first home with as little as a 5% deposit, without a bank, without a mortgage, without compromise.",
          meta: "📖 7 min read · First Time Buyers",
        },
        {
          badge: "FCA",
          title: "Is CrowdToLive FCA Regulated? Everything You Need to Know",
          description:
            "Yes, we are FCA authorised (Ref: 822039). Here's what that means for your protection as a homebuyer and why it matters when choosing an Islamic finance provider.",
          meta: "📖 5 min read · Trust and Safety",
        },
        {
          badge: "Property",
          title: "What Types of Property Can I Buy With Islamic Home Finance?",
          description:
            "Not all properties qualify. This guide explains which homes are eligible under CrowdToLive's platform and how to find the right property for your budget across England.",
          meta: "📖 5 min read · Property Eligibility",
        },
      ],
    },
    {
      type: "whyGrid",
      id: "why",
      chip: "Why We Lead",
      title: "Why CrowdToLive is the Best Islamic Home Finance Company in the UK",
      subtitle: "We compared ourselves to the competition. Here's what sets us apart.",
      items: [
        { icon: "📉", title: "Lowest Entry Deposit", description: "Just 5% required, significantly lower than most Islamic home finance alternatives in the UK market." },
        { icon: "🕌", title: "True Shariah Compliance", description: "Overseen by a dedicated Shariah Supervisory Board. Not just marketing, a legally certified, interest free structure." },
        { icon: "🏛️", title: "FCA Authorised", description: "Fully regulated by the Financial Conduct Authority. Your money and rights are legally protected at all times." },
        { icon: "⚡", title: "Fast Digital Process", description: "Register in under 1 minute. No branch visits, no paper forms. We handle the complexity so you don't have to." },
        { icon: "📈", title: "Flexible Ownership Growth", description: "Increase your share every 3 months, with no minimum amount and no ceiling. Full ownership on your timeline." },
        { icon: "🗺️", title: "England Wide", description: "Freehold properties and standard builds across all of England. Urban or rural, we've got you covered." },
      ],
    },
    {
      type: "compare",
      id: "compare",
      chip: "Comparison",
      title: "CrowdToLive vs Other Islamic Finance Options in the UK",
      headers: [
        "Feature",
        "CrowdToLive",
        "High Street Islamic Banks",
        "Govt Shared Ownership",
        "Conventional Mortgage",
      ],
      rows: [
        {
          cells: [
            { text: "Shariah Compliant" },
            { text: "✅ Yes", tone: "yes" },
            { text: "✅ Yes", tone: "yes" },
            { text: "❌ Debated", tone: "no" },
            { text: "❌ No", tone: "no" },
          ],
        },
        {
          cells: [
            { text: "FCA Regulated" },
            { text: "✅ Yes", tone: "yes" },
            { text: "✅ Yes", tone: "yes" },
            { text: "✅ Yes", tone: "yes" },
            { text: "✅ Yes", tone: "yes" },
          ],
        },
        {
          cells: [
            { text: "Minimum Deposit" },
            { text: "5%", tone: "best" },
            { text: "5 to 20%" },
            { text: "5%" },
            { text: "5 to 10%" },
          ],
        },
        {
          cells: [
            { text: "Interest Free" },
            { text: "✅ Yes", tone: "yes" },
            { text: "✅ Yes", tone: "yes" },
            { text: "❌ Charges apply", tone: "no" },
            { text: "❌ No", tone: "no" },
          ],
        },
        {
          cells: [
            { text: "No Bank Required" },
            { text: "✅ Yes", tone: "yes" },
            { text: "❌ Bank based", tone: "no" },
            { text: "❌ Housing association", tone: "no" },
            { text: "❌ Bank based", tone: "no" },
          ],
        },
        {
          cells: [
            { text: "Flexible Staircasing" },
            { text: "✅ Every 3 months", tone: "yes" },
            { text: "Varies" },
            { text: "❌ Min 10% tranches", tone: "no" },
            { text: "N/A" },
          ],
        },
        {
          cells: [
            { text: "Time to Register" },
            { text: "Under 1 minute", tone: "best" },
            { text: "Days to weeks" },
            { text: "Weeks" },
            { text: "Weeks" },
          ],
        },
      ],
    },
    {
      type: "faq",
      id: "faq",
      chip: "FAQ",
      title: "Frequently Asked Questions About Islamic Home Finance UK",
      subtitle: "Everything you need to know, answered clearly.",
      tone: "dark",
      grid: true,
      items: [
        {
          question: "What is Islamic home finance in the UK?",
          answer:
            "It's a Shariah compliant alternative to conventional mortgages. Instead of a loan with interest (riba), you co own the property with CrowdToLive and pay rent on the share you don't yet own. We're FCA regulated.",
        },
        {
          question: "Is CrowdToLive the best Islamic home finance provider in the UK?",
          answer:
            "We offer the lowest deposit requirement (5%), no interest, full FCA regulation, and England wide coverage.",
        },
        {
          question: "What is a halal mortgage alternative in the UK?",
          answer:
            "A halal mortgage alternative avoids interest entirely. CrowdToLive uses a shared ownership model where you pay rent, not interest, on the portion of the home you don't yet own.",
        },
        {
          question: "How much deposit do I need for Islamic home finance?",
          answer: "Just 5% of the property's purchase price.",
        },
        {
          question: "Is CrowdToLive FCA regulated?",
          answer:
            "Yes. Operated by Elite Capital and Management Services Limited, authorised and regulated by the Financial Conduct Authority. FCA reference number: 822039.",
        },
        {
          question: "Can I buy any house using Islamic home finance?",
          answer:
            "CrowdToLive accepts freehold houses and standard builds across England. Register to check eligibility for a specific property.",
        },
        {
          question: "Is shared ownership halal in the UK?",
          answer:
            "Government shared ownership is debated due to service charges and leasehold structures. CrowdToLive's model is purpose built to be fully Shariah compliant with no ambiguity.",
        },
        {
          question: "Can I increase my ownership share over time?",
          answer:
            "Yes. You can increase your share every 3 months with no cap and no minimum. As your share grows, your rent decreases, until the home is 100% yours.",
        },
      ],
    },
    {
      type: "cta",
      title: "Ready to Buy Your Home the Halal Way?",
      subtitle:
        "Join the UK's leading Islamic home finance platform. FCA regulated, Shariah compliant, 5% deposit, no interest, ever.",
      ctaLabel: "Start Free Registration, 1 Minute",
      ctaHref: "/register",
      tone: "gradient",
    },
  ],
  footer: footerBase,
  variantLinks,
};

export const landingTestimonials: LandingPageConfig = {
  nav: navBase,
  hero: {
    layout: "centered",
    ratingBadgeText: "Rated 4.9 out of 5 by verified customers",
    ratingStarsText: "★★★★★",
    title: "Real Families. Real Homes. Real Trust.",
    titleGradientText: "Real Trust.",
    subtitle:
      "Don't take our word for it. Families across England have trusted CrowdToLive to make their homeownership dream real, interest free, stress free, and Shariah compliant.",
    primaryCta: { label: "Start Your Journey", href: "/register" },
    secondaryCta: { label: "Read Reviews", href: "#reviews" },
    stats: [
      { value: "4.9 ★", label: "Average Rating" },
      { value: "100%", label: "Would Recommend" },
      { value: "FCA", label: "Authorised #822039" },
      { value: "5%", label: "Min Deposit" },
    ],
  },
  sections: [
    {
      type: "trustBar",
      pill: true,
      items: [
        { icon: "🏛️", text: "FCA Authorised #822039" },
        { icon: "🕌", text: "Shariah Certified" },
        { icon: "🏢", text: "Companies House 10347767" },
        { icon: "🔒", text: "Legally Protected" },
        { icon: "🇬🇧", text: "England Wide" },
      ],
    },
    {
      type: "trustpilot",
      id: "trustpilot",
      chip: "Trustpilot",
      title: "What Our Customers Say on Trustpilot",
      subtitle:
        "Our Trustpilot page reflects the honest experiences of families who've been through the CrowdToLive journey.",
      widget: {
        name: "Trustpilot",
        account: "CrowdToLive by Bayuti",
        score: "4.9",
        starsText: "★★★★★",
        label: "Excellent, based on verified reviews",
        bars: [
          { label: "5 stars", percent: "90%", width: "90%" },
          { label: "4 stars", percent: "8%", width: "8%" },
          { label: "3 stars", percent: "2%", width: "2%" },
          { label: "2 stars", percent: "0%", width: "0%" },
          { label: "1 star", percent: "0%", width: "0%" },
        ],
        ctaLabel: "View All Reviews on Trustpilot",
        ctaHref: "https://www.trustpilot.com",
      },
    },
    {
      type: "reviews",
      id: "reviews",
      chip: "Verified Reviews",
      title: "Hear From Families Just Like Yours",
      subtitle: "Every review below is from a real CrowdToLive customer.",
      items: [
        {
          featured: true,
          starsText: "★★★★★",
          quote:
            "My husband and I would like to sincerely thank Pankaj for his incredible support throughout our entire home buying journey. From start to finish he went above and beyond to guide us through every stage with patience and care. There were moments when it felt like nothing was moving forward, but Pankaj always remained calm, reassuring, and positive. His communication was excellent and he always took time to explain everything clearly, which really helped ease our stress as first time buyers. He's genuinely kind and caring, and we felt supported the whole way through. We're extremely grateful and would highly recommend his service to anyone!",
          author: {
            initials: "F",
            name: "Fatima",
            meta: "First Time Homebuyer, England",
            badge: "✅ Verified Purchase",
          },
        },
        {
          starsText: "★★★★★",
          quote:
            "Finally a way to buy a home without going against our Islamic values. The process was incredibly clear and the team were always on hand to answer questions. I never thought I'd be a homeowner at 32. CrowdToLive made it happen.",
          author: {
            initials: "A",
            name: "Ahmed R.",
            meta: "Homeowner, Birmingham",
            badge: "✅ Verified Purchase",
          },
        },
        {
          starsText: "★★★★★",
          quote:
            "We had been renting for years because we couldn't find a halal way to buy. CrowdToLive changed everything. The team were professional, transparent, and incredibly supportive. Our children finally have a place to call home.",
          author: {
            initials: "S",
            name: "Sumayya K.",
            meta: "Family Homebuyer, Manchester",
            badge: "✅ Verified Purchase",
          },
        },
        {
          starsText: "★★★★★",
          quote:
            "The concept is brilliant and the execution is even better. No jargon, no hidden fees, no interest. Everything was explained clearly and I felt completely in control throughout. Highly recommend to any Muslim family looking to own their home.",
          author: {
            initials: "O",
            name: "Omar T.",
            meta: "First Time Buyer, London",
            badge: "✅ Verified Purchase",
          },
        },
        {
          starsText: "★★★★★",
          quote:
            "I was sceptical at first but the FCA regulation gave me confidence. The process was smooth and the team answered every question I had. I moved into my new home within weeks. Absolutely recommend to anyone who's been on the fence.",
          author: {
            initials: "Z",
            name: "Zaynab M.",
            meta: "Homeowner, Leicester",
            badge: "✅ Verified Purchase",
          },
        },
        {
          starsText: "★★★★★",
          quote:
            "As someone who had given up on ever owning a home because of my faith, CrowdToLive felt like a miracle. Clear, honest, and genuinely Islamic. I've already recommended it to my entire family and community.",
          author: {
            initials: "Y",
            name: "Yusuf A.",
            meta: "Homeowner, Bradford",
            badge: "✅ Verified Purchase",
          },
        },
      ],
    },
    {
      type: "credibility",
      id: "credibility",
      chip: "Credentials",
      title: "Why You Can Trust CrowdToLive",
      subtitle:
        "We're not just a startup. We're a regulated, certified, and legally protected financial services company committed to Muslim families in the UK.",
      items: [
        { icon: "🏛️", value: "FCA", label: "Authorised and Regulated\nRef: 822039" },
        { icon: "🕌", value: "100%", label: "Shariah Compliant\nBoard Certified" },
        { icon: "🏢", value: "2016", label: "Founded\nCo. House #10347767" },
        { icon: "⭐", value: "4.9", label: "Customer Rating\nTrustpilot Verified" },
        { icon: "🇬🇧", value: "England", label: "Full Coverage\nAll English counties" },
        { icon: "🔒", value: "Legal", label: "Ownership Legally\nRegistered and Protected" },
      ],
    },
    {
      type: "steps",
      id: "how",
      chip: "How It Works",
      title: "3 Steps Trusted by Hundreds of Families",
      tone: "dark",
      numbered: true,
      items: [
        {
          icon: "🏡",
          title: "Choose Your Home",
          description:
            "Share the property you want. We review it and confirm eligibility in your area. No waiting list.",
        },
        {
          icon: "🔑",
          title: "Pay 5% and Move In",
          description:
            "With 5% deposit you own your first share and move straight into your new home. You pay rent only on what you don't yet own.",
        },
        {
          icon: "📈",
          title: "Grow Your Ownership",
          description:
            "Buy more shares every 3 months. Your rent falls as your ownership grows, until the home is fully yours.",
        },
      ],
      eligibilityText: "✅ Accepted: Freehold properties, houses, standard builds across England",
    },
    {
      type: "video",
      chip: "Video",
      title: "Watch Our Families Tell Their Story",
      subtitle:
        "Hear directly from homeowners who chose CrowdToLive as their path to an interest free home.",
      ctaLabel: "Watch Our Story",
      ctaHref: "https://crowdtolive.bayuti.com/wp-content/uploads/2026/01/Presentation-video-1.mp4",
      ctaSubtitle:
        "How CrowdToLive is helping Muslim families own their home the halal way",
    },
    {
      type: "cta",
      title: "Join Families Who Said Yes to Halal Homeownership",
      subtitle:
        "Register in under 1 minute. No credit check to start. Join a community of families across England building their future the ethical way.",
      ctaLabel: "Start Your Journey Today",
      ctaHref: "/register",
      tone: "darkGlow",
      note: "FCA Regulated · Shariah Compliant · 5% Deposit · Zero Interest",
    },
  ],
  footer: footerBase,
  variantLinks,
};
