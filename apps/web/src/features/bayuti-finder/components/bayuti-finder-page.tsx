"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { Public_Sans } from "next/font/google";
import { FormEvent, useMemo, useState } from "react";
import styles from "./bayuti-finder-page.module.css";

const publicSans = Public_Sans({
  subsets: ["latin"],
});

type FinderStatus = "auth" | "incomplete" | "not-found" | "dashboard";

type FinderContact = {
  city: string | null;
  deposit_amount_ctl: number | string | null;
  annual_salary_number: number | string | null;
  firstname?: string | null;
  lastname?: string | null;
  submitted_property_url_2?: string | null;
  submitted_property_url_4?: string | null;
  submitted_property_url_5?: string | null;
  submittted_property_url_1?: string | null;
  submittted_property_url_3?: string | null;
};

type CheckContactResponse = {
  exists: boolean;
  contact?: FinderContact | null;
};

const logoUrl = "https://finder.bayuti.com/assets/bayuti-finder-logo-Crq88YOm.png";
const qualificationUrl = "https://crowdtolive.bayuti.com/";

function toNumber(value: number | string | null | undefined) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatMoney(value: number) {
  return `£${value.toLocaleString("en-GB")}`;
}

function getSavedPropertyUrls(contact: FinderContact | null) {
  if (!contact) return [];

  const values = [
    contact.submittted_property_url_1,
    contact.submitted_property_url_2,
    contact.submittted_property_url_3,
    contact.submitted_property_url_4,
    contact.submitted_property_url_5,
  ];

  return values.filter((value): value is string => typeof value === "string" && value.trim().length > 0);
}

export function BayutiFinderPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FinderStatus>("auth");
  const [isVerifying, setIsVerifying] = useState(false);
  const [contact, setContact] = useState<FinderContact | null>(null);

  const savedProperties = useMemo(() => getSavedPropertyUrls(contact), [contact]);
  const summary = useMemo(() => {
    if (!contact) {
      return {
        location: "Not available",
        salary: 0,
        deposit: 0,
      };
    }

    return {
      location: contact.city?.trim() || "Not available",
      salary: toNumber(contact.annual_salary_number),
      deposit: toNumber(contact.deposit_amount_ctl),
    };
  }, [contact]);

  const resetToAuth = () => {
    setStatus("auth");
    setIsVerifying(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsVerifying(true);

    try {
      const response = await fetch("https://finder.bayuti.com/api/check-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
        }),
      });

      const json = (await response.json()) as CheckContactResponse;

      if (!response.ok) {
        throw new Error("Request failed");
      }

      if (!json.exists) {
        setContact(null);
        setStatus("not-found");
        return;
      }

      const nextContact = json.contact ?? null;
      setContact(nextContact);

      const location = nextContact?.city?.trim();
      const salary = toNumber(nextContact?.annual_salary_number);
      const deposit = toNumber(nextContact?.deposit_amount_ctl);

      if (!location || !salary || !deposit) {
        setStatus("incomplete");
        return;
      }

      setStatus("dashboard");
    } catch {
      setContact(null);
      setStatus("not-found");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className={`${styles.page} ${publicSans.className}`}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/landing/bayuti-finder" className={styles.logo}>
            <img src={logoUrl} alt="Bayuti Finder" />
          </Link>
          <div className={styles.headerNote}>Matched to your budget, location, deposit, salary, and preferences.</div>
        </div>
      </header>

      <main className={styles.main}>
        {status === "auth" ? (
          <div className={styles.centerWrap}>
            <section className={styles.stateCard}>
              <h1>Find homes within your alternative financing range</h1>
              <p className={styles.lead}>Enter the email you used for your qualification form to see your matches.</p>

              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="finder-email">
                    Email Address
                  </label>
                  <input
                    id="finder-email"
                    className={styles.input}
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="name@example.com"
                    autoComplete="email"
                  />
                </div>

                <div className={styles.actions}>
                  <button type="submit" className={styles.primaryButton} disabled={isVerifying}>
                    {isVerifying ? "Verifying..." : "Continue"}
                    <svg className={styles.primaryIcon} viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </div>

                <div className={styles.secondaryAction}>
                  <a href={qualificationUrl} target="_blank" rel="noopener noreferrer" className={styles.ghostButton}>
                    Complete your details first
                  </a>
                </div>
              </form>
            </section>
          </div>
        ) : null}

        {status === "incomplete" ? (
          <div className={styles.centerWrap}>
            <section className={styles.resultCard}>
              <h2>Please complete your profile</h2>
              <p className={styles.resultText}>
                We found your account but some required details (location, salary, or deposit) are missing. Please
                complete the step below before proceeding.
              </p>
              <div className={styles.resultActions}>
                <a href={qualificationUrl} target="_blank" rel="noopener noreferrer" className={styles.secondaryButton}>
                  Complete Qualification Form
                </a>
                <button type="button" className={styles.mutedButton} onClick={resetToAuth}>
                  Try a different email
                </button>
              </div>
            </section>
          </div>
        ) : null}

        {status === "not-found" ? (
          <div className={styles.centerWrap}>
            <section className={styles.resultCard}>
              <h2>We couldn&apos;t find your details yet</h2>
              <p className={styles.resultText}>
                Please complete your profile first so we can match you with suitable homes and calculate your
                alternative financing eligibility.
              </p>
              <div className={styles.resultActions}>
                <a href={qualificationUrl} target="_blank" rel="noopener noreferrer" className={styles.secondaryButton}>
                  Complete Qualification Form
                </a>
                <button type="button" className={styles.mutedButton} onClick={resetToAuth}>
                  Try a different email
                </button>
              </div>
            </section>
          </div>
        ) : null}

        {status === "dashboard" ? (
          <div className={styles.dashboardWrap}>
            <section className={styles.heroCard}>
              <div className={styles.heroHead}>
                <div className={styles.heroMeta}>
                  <div className={styles.heroBadge}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 21h16.5M4.5 3h15l-.75 12.75a1.5 1.5 0 01-1.497 1.413H6.747A1.5 1.5 0 015.25 15.75L4.5 3z"
                      />
                    </svg>
                  </div>
                  <div className={styles.heroTitles}>
                    <h2>Bayuti Finder</h2>
                    <p>Adjust filters to refine your property matches</p>
                  </div>
                </div>
                <div className={styles.pill}>{savedProperties.length} results</div>
              </div>

              <div className={styles.heroBody}>
                <div>
                  <div className={styles.sectionLabel}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21a8.966 8.966 0 005.217-1.671L12 3 6.783 19.329A8.966 8.966 0 0012 21z"
                      />
                    </svg>
                    Financial Details
                  </div>
                  <div className={styles.grid3}>
                    <div className={styles.summaryCard}>
                      <span>Location</span>
                      <strong>{summary.location}</strong>
                    </div>
                    <div className={styles.summaryCard}>
                      <span>Annual salary</span>
                      <strong>{formatMoney(summary.salary)}</strong>
                    </div>
                    <div className={styles.summaryCard}>
                      <span>Deposit</span>
                      <strong>{formatMoney(summary.deposit)}</strong>
                    </div>
                  </div>
                </div>

                <div className={styles.notice}>
                  The live Bayuti Finder app includes a gated property-results dashboard powered by third-party search
                  APIs and previously submitted property URLs. The direct contact verification and saved property links
                  are preserved here, but the full external property-search workflow remains outside this integrated
                  copy.
                </div>

                <div>
                  <div className={styles.sectionLabel}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5h10.5m-10.5 4.5h10.5m-10.5 4.5h6.75" />
                    </svg>
                    Submitted properties
                  </div>

                  {savedProperties.length > 0 ? (
                    <div className={styles.savedProperties}>
                      {savedProperties.map((url, index) => (
                        <a
                          key={`${url}-${index}`}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.propertyLink}
                        >
                          <div>
                            <strong>Submitted property {index + 1}</strong>
                            <span>{url}</span>
                          </div>
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 16.5L16.5 7.5m0 0H9.75m6.75 0v6.75" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.notice}>
                      No submitted property URLs were available on the verified contact record.
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        ) : null}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerMark}>
            <img src={logoUrl} alt="Bayuti Finder" />
          </div>
          <p className={styles.footerText}>
            Crowdtolive® is a registered trading name of Elite Capital and Management Services Limited, which is
            authorised and regulated by the Financial Conduct Authority (Reference Number: 822039). Elite Capital and
            Management Services Limited (Companies House number: 10347767) is registered in England and Wales with its
            registered office at 809 Salisbury House, 29 Finsbury Circus, London EC2M 7AQ.
          </p>
        </div>
      </footer>
    </div>
  );
}
