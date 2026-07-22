"use client";

/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { HubspotRegistrationForm } from "./hubspot-registration-form";
import styles from "./amana-landing-page.module.css";

type NavLink = {
  label: string;
  href: string;
  external?: boolean;
  active?: boolean;
};

const inter = Inter({
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-amana-display",
  weight: ["700", "800"],
});

const navLinks: NavLink[] = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Deposit calculator", href: "#calculator", active: true },
  { label: "FAQ", href: "#faq" },
  { label: "Bayuti Finder", href: "https://crowdtolive-2026-api.vercel.app/landing/bayuti-finder", external: true },
  { label: "Contact", href: "/contact" },
];

const heroStats = [
  { value: "5%*", label: "Expected annual return" },
  { value: "3", label: "Working days liquidity" },
  { value: "£500", label: "Minimum to start" },
  { value: "0", label: "Management fees" },
] as const;

const proofItems = [
  {
    title: "FCA regulated",
    text: "Authorised and regulated by the Financial Conduct Authority",
    icon: ShieldIcon,
  },
  {
    title: "Shariah compliant",
    text: "SSB-certified, zero interest, halal home financing pathway",
    icon: ScaleIcon,
  },
  {
    title: "Property-backed returns",
    text: "Your savings work in real UK property assets",
    icon: PropertyIcon,
  },
  {
    title: "Access in 3 working days",
    text: "Not locked in. Withdraw when you need to.",
    icon: LockIcon,
  },
] as const;

const steps = [
  {
    title: "Register and verify",
    description:
      "Create your account, complete identity verification, and pass the investor appropriateness check. Takes under 10 minutes.",
    icon: UserPlusIcon,
  },
  {
    title: "Fund your wallet",
    description:
      "Deposit from £500. Add a monthly recurring payment and let your investment grow automatically. Pause or cancel any time.",
    icon: WalletIcon,
  },
  {
    title: "Earn property-backed returns",
    description:
      "Your home deposit is invested into FCA-regulated, Shariah-compliant property assets. Expected 5% annual return, not guaranteed.",
    icon: PropertyIcon,
  },
  {
    title: "Unlock CrowdToLive",
    description:
      "Amana savers get priority access to CrowdToLive alternative home financing, the halal path to shared homeownership.",
    icon: UnlockIcon,
  },
] as const;

const faqs = [
  {
    question: "Is Amana halal and Shariah compliant?",
    answer:
      "Yes. Amana is certified by our Shariah Supervisory Board (SSB). All investments are structured to be free of interest (riba) and comply with Islamic finance principles. The product is specifically designed for Muslim homebuyers who cannot use conventional interest-bearing savings products.",
  },
  {
    question: "Is the 5% return guaranteed?",
    answer:
      "No. The 5% is an expected annual return based on the projected performance of the underlying property assets. Actual returns may be higher or lower. Your capital is at risk. You could lose some or all of the money you invest. Amana is regulated by the FCA and is authorised under ECMS Ltd.",
  },
  {
    question: "Can I access my money if I need it?",
    answer:
      "Yes. Amana offers liquidity from 3 working days. This means you are not locked in. If your circumstances change or you need your home deposit for a property purchase, you can request a withdrawal and receive your funds within 3 working days. There are no early exit penalties.",
  },
  {
    question: "What is the minimum I can invest?",
    answer:
      "The minimum deposit to start is £500. You can then add a monthly recurring payment from any amount to keep building your investment automatically. There is no maximum. Amana is designed for homebuyers at all stages of their saving journey.",
  },
  {
    question: "How does Amana connect to CrowdToLive alternative home financing?",
    answer:
      "Amana savers are prioritised for access to CrowdToLive, Bayuti's shared homeownership product. When your home deposit is ready and you find a property, CrowdToLive provides the halal alternative home financing structure to help you buy. Amana and CrowdToLive are designed to work together as a complete path from saving to homeownership.",
  },
  {
    question: "Is Amana covered by the FSCS?",
    answer:
      "No. Amana is a property-backed investment, not a bank savings account, so it is not covered by the Financial Services Compensation Scheme (FSCS). It is however regulated by the Financial Conduct Authority (FCA) under ECMS Ltd. You are unlikely to be protected if something goes wrong. Please only invest what you can afford to lose.",
  },
] as const;

function formatCurrency(amount: number) {
  return `£${Math.round(amount).toLocaleString("en-GB")}`;
}

function calculateCompound(monthly: number, months: number, rate: number) {
  const monthlyRate = rate / 12;
  let total = 0;
  for (let index = 0; index < months; index += 1) {
    total = (total + monthly) * (1 + monthlyRate);
  }
  return total;
}

export function AmanaLandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [monthly, setMonthly] = useState(500);
  const [months, setMonths] = useState(20);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculator = useMemo(() => {
    const amana = calculateCompound(monthly, months, 0.05);
    const bank = calculateCompound(monthly, months, 0.035);
    const contributed = monthly * months;
    return {
      amana,
      bank,
      earned: amana - contributed,
    };
  }, [monthly, months]);

  return (
    <div className={`${styles.root} ${inter.className} ${playfair.variable}`}>
      <Script src="https://js.hsforms.net/forms/embed/7221343.js" strategy="afterInteractive" />
      <div className={styles.page}>
        <div className={styles.fcaBar}>
          <div className={styles.fcaInner}>
            <div className={styles.fcaIcon}>
              <ShieldIcon />
            </div>
            <p className={styles.fcaText}>
              <strong>FCA WARNING:</strong> Don&apos;t invest unless you&apos;re prepared to lose all the money you
              invest. This is a high-risk investment and you are unlikely to be protected if something goes wrong.{" "}
              <a href="https://www.fca.org.uk/investsmart" target="_blank" rel="noopener noreferrer">
                Take 2 mins to learn more
              </a>
            </p>
          </div>
        </div>

        <header className={styles.siteHeader} id="siteHeader">
          <div className={styles.headerInner}>
            <a href="https://crowdtolive.bayuti.com/" className={styles.logo}>
              <img
                src="https://crowdtolive.bayuti.com/wp-content/uploads/2025/12/Crowdtolive-W-R-3.png"
                alt="CrowdToLive by Bayuti"
              />
            </a>

            <nav className={styles.headerNav}>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={`${styles.navLink}${link.active ? ` ${styles.activeLink}` : ""}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className={styles.headerBtns}>
              <a
                href="https://www.bayuti.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnGhost}
              >
                Invest in properties
              </a>
              <a href="#register" className={styles.btnPrimary}>
                Amana
              </a>
            </div>

            <button
              type="button"
              className={`${styles.hamburger}${mobileOpen ? ` ${styles.hamburgerOpen}` : ""}`}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((previous) => !previous)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </header>

        <div className={`${styles.mobileMenu}${mobileOpen ? ` ${styles.mobileMenuOpen}` : ""}`}>
          <div className={styles.mobLinks}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={styles.mobLink}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className={styles.mobBtns}>
            <a
              href="https://www.bayuti.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobBtnGhost}
            >
              Invest in properties
            </a>
            <a href="#register" className={styles.mobBtnPrimary} onClick={() => setMobileOpen(false)}>
              Amana
            </a>
          </div>
        </div>

        <section className={styles.hero}>
          <div className={styles.heroBg} />
          <div className={styles.heroInner}>
            <div>
              <div className={styles.heroEyebrow}>
                <span className={styles.heroEyebrowDot} />
                FCA regulated · Shariah compliant · Now open
              </div>
              <h1 className={styles.heroTitle}>
                Your home deposit is
                <br />
                <em>sitting still.</em>
                <br />
                Make it work.
              </h1>
              <p className={styles.heroSub}>
                While you wait to buy, your savings are losing to inflation. Amana by Bayuti puts your home
                deposit into property-backed assets, with an expected 5% annual return and access in 3 working days.
              </p>

              <div className={styles.heroStats}>
                {heroStats.map((item) => (
                  <div key={item.label} className={styles.heroStat}>
                    <div className={styles.heroStatVal}>
                      {item.value === "£500" ? "£500" : item.value.includes("*") ? (
                        <>
                          5%<span>*</span>
                        </>
                      ) : (
                        item.value
                      )}
                    </div>
                    <div className={styles.heroStatLabel}>{item.label}</div>
                  </div>
                ))}
              </div>

              <div className={styles.heroCtas}>
                <a href="#register" className={styles.ctaMain}>
                  Start building my home deposit
                </a>
                <a href="#calculator" className={styles.ctaSecondary}>
                  See how it grows
                </a>
              </div>
            </div>

            <div className={styles.formCard} id="register">
              <h3>Register your interest</h3>
              <p>Join homebuyers already growing their home deposit with Amana. Free to register, no commitment required.</p>
              <HubspotRegistrationForm className={styles.hubspotHeroForm} />
              <p className={styles.formDisclaimer}>
                By registering you agree to our privacy policy. Capital at risk. Expected 5% return is not guaranteed.
              </p>
            </div>
          </div>
        </section>

        <div className={styles.proofStrip}>
          <div className={styles.proofInner}>
            {proofItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={styles.proofItem}>
                  <div className={styles.proofIcon}>
                    <Icon />
                  </div>
                  <div className={styles.proofText}>
                    <strong>{item.title}</strong>
                    {item.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <section className={styles.sectionLight} id="how-it-works">
          <div className={styles.sectionInner}>
            <div className={styles.sectionEyebrow}>How Amana works</div>
            <h2 className={styles.sectionTitle}>
              Four steps from
              <br />
              home deposit anxiety to growing wealth
            </h2>
            <p className={styles.sectionSub}>
              Amana is designed for homebuyers who are waiting to buy. Your home deposit grows in property-backed
              assets instead of sitting in a low-interest savings account.
            </p>
            <div className={styles.steps}>
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className={styles.step}>
                    <div className={styles.stepNum}>Step {index + 1}</div>
                    <div className={styles.stepIcon}>
                      <Icon />
                    </div>
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                    {index < steps.length - 1 ? <div className={styles.stepConnector} /> : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className={styles.calcSection} id="calculator">
          <div className={styles.calcInner}>
            <div>
              <div className={styles.sectionEyebrow}>Deposit calculator</div>
              <h2 className={styles.sectionTitle}>
                See the difference
                <br />
                Amana makes
              </h2>
              <p className={styles.sectionSub}>
                Compare what your savings earn in a standard UK savings account versus Amana. The gap compounds every month.
              </p>

              <div className={styles.calcInfoList}>
                <div className={`${styles.calcInfoCard} ${styles.calcInfoCardMuted}`}>
                  <div className={styles.calcInfoLabel}>Average UK savings account</div>
                  <div className={styles.calcInfoValue}>3.5% AER</div>
                  <div className={`${styles.calcInfoText} ${styles.calcInfoMutedText}`}>
                    Below inflation. Your money is losing real value.
                  </div>
                </div>

                <div className={`${styles.calcInfoCard} ${styles.calcInfoCardHighlight}`}>
                  <div className={styles.calcInfoLabel}>Amana by Bayuti</div>
                  <div className={styles.calcInfoValue}>5% expected*</div>
                  <div className={styles.calcInfoText}>Property-backed. FCA regulated. Shariah compliant.</div>
                </div>

                <p className={styles.calcInfoDisclaimer}>
                  *Expected return is not guaranteed. Capital at risk. Actual returns may vary. Past performance is not a
                  reliable indicator of future results. FCA regulated by ECMS Ltd.
                </p>
              </div>
            </div>

            <div className={styles.calcCard}>
              <h3>Your home deposit growth calculator</h3>

              <div className={styles.calcRow}>
                <div className={styles.calcLabel}>
                  Monthly deposit <span>{formatCurrency(monthly)}</span>
                </div>
                <input
                  className={styles.calcSlider}
                  type="range"
                  min="250"
                  max="3000"
                  step="50"
                  value={monthly}
                  onChange={(event) => setMonthly(Number(event.target.value))}
                />
              </div>

              <div className={styles.calcRow}>
                <div className={styles.calcLabel}>
                  Saving period <span>{months} months</span>
                </div>
                <input
                  className={styles.calcSlider}
                  type="range"
                  min="6"
                  max="60"
                  step="1"
                  value={months}
                  onChange={(event) => setMonths(Number(event.target.value))}
                />
              </div>

              <div className={styles.calcResult}>
                <div className={styles.calcResultLabel}>Your Amana total</div>
                <div className={styles.calcResultVal}>{formatCurrency(calculator.amana)}</div>
                <div className={styles.calcResultSub}>
                  Earned {formatCurrency(calculator.earned)} above what you put in
                </div>
              </div>

              <div className={styles.calcComparison}>
                <div className={styles.calcVs}>
                  <div className={styles.calcVsLabel}>Standard savings (3.5%)</div>
                  <div className={`${styles.calcVsVal} ${styles.bankVal}`}>{formatCurrency(calculator.bank)}</div>
                </div>
                <div className={styles.calcVs}>
                  <div className={styles.calcVsLabel}>Amana (5% expected)</div>
                  <div className={`${styles.calcVsVal} ${styles.amanaVal}`}>{formatCurrency(calculator.amana)}</div>
                </div>
              </div>

              <div className={styles.calcDisclaimer}>
                Expected 5% annual return. Not guaranteed. Capital at risk. For illustration only.
              </div>

              <a href="#register" className={styles.calcAnchor}>
                Start building my home deposit
              </a>
            </div>
          </div>
        </section>

        <section className={styles.sectionFaq} id="faq">
          <div className={styles.faqInner}>
            <div className={styles.sectionEyebrow}>Questions</div>
            <h2 className={styles.sectionTitle}>Everything you need to know</h2>
            <div className={styles.faqList}>
              {faqs.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={item.question} className={`${styles.faqItem}${isOpen ? ` ${styles.faqOpen}` : ""}`}>
                    <button
                      type="button"
                      className={styles.faqQuestion}
                      onClick={() => setOpenFaq((current) => (current === index ? null : index))}
                    >
                      {item.question}
                      <svg className={styles.faqChevron} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                    <div className={styles.faqAnswer}>{item.answer}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.ctaSectionInner}>
            <div className={styles.sectionEyebrow}>Ready to start</div>
            <h2>
              Make your home deposit
              <br />
              <em>work harder</em>
            </h2>
            <p>Join homebuyers already growing their home deposit with Amana. Register now. Takes under 2 minutes.</p>

            <div className={styles.ctaForm}>
              <HubspotRegistrationForm className={styles.hubspotCtaForm} />
              <p className={styles.ctaDisclaimer}>
                FCA regulated. Capital at risk. Expected 5% return not guaranteed. By registering you agree to our privacy
                policy and terms of use.
              </p>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.footInner}>
            <p>
              Bayuti is a registered trading name of Elite Capital and Management Services Limited, which is authorised and
              regulated by the Financial Conduct Authority (Reference Number: 822039). Elite Capital and Management
              Services Limited (Companies House number: 10347767) is registered in England and Wales with its registered
              office at 809 Salisbury House, 29 Finsbury Circus, London, EC2M 7AQ.
            </p>
            <div className={styles.footLinks}>
              <a href="/terms-of-use">Terms of use</a>
              <a href="/privacy-policy">Privacy policy</a>
              <a href="/cookies-notice">Cookies notice</a>
              <a href="#">Risk warning</a>
              <a href="https://www.fca.org.uk/investsmart" target="_blank" rel="noopener noreferrer">
                FCA InvestSmart
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  );
}

function ScaleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"
      />
    </svg>
  );
}

function PropertyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  );
}

function UserPlusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
      />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9"
      />
    </svg>
  );
}

function UnlockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
      />
    </svg>
  );
}
