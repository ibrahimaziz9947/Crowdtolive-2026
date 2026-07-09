export interface HomepageAction {
  label: string;
  note?: string;
  href: string;
}

export interface HomepageBenefit {
  title: string;
  description: string;
}

export interface HomepageStep {
  title: string;
  description: string;
  icon: "home" | "box" | "growth";
  accent: "green" | "blue";
}

export interface HomepageFaq {
  question: string;
  answerHtml: string;
}

export interface HomepageSocialLink {
  label: string;
  href: string;
  icon: "facebook" | "youtube" | "instagram" | "linkedin" | "tiktok";
}

export const homepageContent = {
  logo: {
    src: "/homepage/logo.png",
    alt: "CrowdToLive",
  },
  hero: {
    eyebrow:
      "Mortgage-free home ownership from just a 5% deposit, available exclusively in England",
    titleLines: ["Start Your", "Homebuying", "Journey"],
    paragraphs: [
      "With our shared ownership model, you can buy your dream home without taking on debt or paying interest.",
      "Start with what you can afford today, live in your home, and increase your ownership over time, at your own pace.",
    ],
    backgroundVideoSrc:
      "https://crowdtolive.bayuti.com/wp-content/uploads/2026/01/14777094_1280_720_25fps.mp4",
    primaryAction: {
      label: "Start Your Journey Today",
      note: "Only 1 min to complete",
      href: "/register",
    } satisfies HomepageAction,
  },
  acceptedProperties: ["Freehold properties", "Houses", "Standard builds"],
  benefits: {
    eyebrow: "Your Homeownership Experts",
    title: "Own Your Home with Just a 5% Deposit. Simple & Stress-Free.",
    items: [
      {
        title: "No Mortgage Or Debt",
        description:
          "Skip the bank loans. Buy your home through our shared ownership model and live in it from day one, completely mortgage-free.",
      },
      {
        title: "Flexible & Affordable Path",
        description:
          "Start with as little as a 5% deposit and increase your ownership at your own pace. You stay in control of your home and your budget.",
      },
      {
        title: "Ethical & Compliant",
        description:
          "Our model is based on Shariah principles, ensuring it is interest-free, fair, and designed to help you responsibly achieve homeownership in a way that aligns with Shariah values.",
      },
    ] satisfies HomepageBenefit[],
  },
  story: {
    backgroundImageSrc:
      "https://crowdtolive.bayuti.com/wp-content/uploads/2026/01/pexels-pixabay-358636-scaled.jpg",
    videoSrc:
      "https://crowdtolive.bayuti.com/wp-content/uploads/2026/01/Presentation-video-1.mp4",
    videoPosterSrc:
      "https://crowdtolive.bayuti.com/wp-content/uploads/2026/01/family.jpg",
    titleLines: ["Real Stories", "From Real Homebuyers"],
    ratingName: "Fatima",
    quoteParagraphs: [
      "My husband and I would like to sincerely thank Pankaj for his incredible support throughout our entire home-buying journey. From start to finish, he went above and beyond to guide us through every stage with patience and care.",
      "There were moments when it felt like nothing was moving forward, but Pankaj always remained calm, reassuring, and positive, reminding us to trust the process. His communication was excellent, and he always took the time to explain everything clearly, which really helped ease our stress as first-time buyers.",
      "He’s not only professional but also genuinely kind and caring, which made us feel supported the whole way through. We’re extremely grateful for all his help and would highly recommend his service to anyone looking to buy a home!",
    ],
  },
  steps: {
    title: "How It Works in 3 Simple Steps",
    items: [
      {
        title: "Choose Your Home and Pay Your Deposit",
        description:
          "Tell us which property you want by sharing a link or address. Once approved, you pay a deposit and purchase an initial share of the home. The remaining share is funded through our platform.",
        icon: "home",
        accent: "green",
      },
      {
        title: "Move In and Pay Rent Only on What You Don’t Own",
        description:
          "You move into your new home straight away. You pay rent only on the portion you don’t own, while building equity in the part that belongs to you.",
        icon: "box",
        accent: "blue",
      },
      {
        title: "Increase Your Ownership Over Time",
        description:
          "You can buy more shares and reduce your rent whenever you’re ready, starting from every three months. No pressure, no hidden terms, just clear and predictable progress toward full ownership.",
        icon: "growth",
        accent: "blue",
      },
    ] satisfies HomepageStep[],
  },
  callToAction: {
    titleLines: ["Ready to Take the First Step", "Toward Your Home?"],
    description:
      "You’re one minute away from starting a realistic, achievable, and stress-free home-buying journey.",
    primaryAction: {
      label: "Start Your Journey Today",
      note: "Only 1 min to complete",
      href: "/register",
    } satisfies HomepageAction,
  },
  faq: {
    backgroundImageSrc:
      "https://crowdtolive.bayuti.com/wp-content/uploads/2026/01/pexels-axp-photography-500641970-30683447-scaled.jpg",
    title: "Common Questions About Homeownership",
    items: [
      {
        question: "How much deposit do I need?",
        answerHtml:
          "You’ll need a minimum deposit of <b>5% of the property’s purchase price</b> to get started.",
      },
      {
        question: "Is there a waiting list?",
        answerHtml:
          "No, there’s no waiting list. If you’re ready to move forward, we’re ready to support you.",
      },
      {
        question: "How is the rent worked out?",
        answerHtml:
          "Your rent is based on a few simple factors, such as the property’s location, how much deposit you put down, and your overall affordability profile. Everything is calculated fairly and transparently.",
      },
      {
        question: "Can I increase my ownership in the property over time?",
        answerHtml:
          "Yes. There’s <b>no limit</b> on how much you can increase your ownership. You can buy more of the property <b>every three months</b>, whenever it suits you.",
      },
      {
        question: "Who pays the stamp duty and legal fees?",
        answerHtml:
          "Stamp duty and legal fees are shared between you and the company, based on how much of the property each one owns at the time of purchase.",
      },
    ] satisfies HomepageFaq[],
  },
  social: {
    title: "Join our community on social media:",
    links: [
      {
        label: "Facebook",
        href: "https://www.facebook.com/bayutiofficial/",
        icon: "facebook",
      },
      {
        label: "Youtube",
        href: "https://www.youtube.com/@Bayuti_Official",
        icon: "youtube",
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/bayuti_official",
        icon: "instagram",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/bayuti",
        icon: "linkedin",
      },
      {
        label: "TikTok",
        href: "https://www.tiktok.com/@bayutiofficial",
        icon: "tiktok",
      },
    ] satisfies HomepageSocialLink[],
  },
  footer: {
    legal:
      "Crowdtolive® is a registered trading name of Elite Capital and Management Services Limited, which is authorised and regulated by the Financial Conduct Authority (Reference Number: 822039). Elite Capital and Management Services Limited (Companies House number: 10347767) is registered in England and Wales with its registered office at 809 Salisbury House, 29 Finsbury Circus, London EC2M 7AQ.",
  },
} as const;
