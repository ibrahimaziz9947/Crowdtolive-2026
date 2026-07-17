"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import styles from "./contact-page.module.css";

const inter = Inter({ subsets: ["latin"] });

const navLinks = [
  { label: "How it works", href: "/landing/amana-home-deposit-builder#how-it-works" },
  { label: "Deposit calculator", href: "/landing/amana-home-deposit-builder#calculator" },
  { label: "FAQ", href: "/landing/amana-home-deposit-builder#faq" },
  { label: "Bayuti Finder", href: "/landing/bayuti-finder" },
] as const;

const socialLinks = [
  { label: "Facebook", handle: "crowdtolive", icon: "f", href: "https://www.facebook.com/bayutiofficial/" },
  { label: "Instagram", handle: "crowdtolive", icon: "◎", href: "https://www.instagram.com/bayuti_official/" },
  { label: "TikTok", handle: "@crowdtolive", icon: "♪", href: "https://www.tiktok.com/@bayutiofficial" },
  { label: "YouTube", handle: "CROWDTOLIVE", icon: "▶", href: "https://www.youtube.com/@Bayuti_Official" },
  { label: "LinkedIn", handle: "crowd-to-live", icon: "in", href: "https://www.linkedin.com/company/bayuti" },
] as const;

export function ContactPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className={`${styles.root} ${inter.className}`}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/landing/amana-home-deposit-builder" className={styles.logo} aria-label="CrowdToLive home">
            <img src="/homepage/logo.png" alt="CrowdToLive by Bayuti" />
          </Link>

          <nav className={styles.navigation} aria-label="Primary navigation">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className={styles.navigationLink}>{link.label}</a>
            ))}
            <a href="/contact" className={`${styles.navigationLink} ${styles.activeLink}`} aria-current="page">Contact</a>
          </nav>

          <div className={styles.headerActions}>
            <a href="https://www.bayuti.com/" target="_blank" rel="noopener noreferrer" className={styles.secondaryButton}>Invest in properties</a>
            <Link href="/landing/amana-home-deposit-builder#register" className={styles.primaryButton}>Amana</Link>
          </div>

          <button type="button" className={styles.menuButton} aria-label="Toggle navigation" aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)}>
            <span /><span /><span />
          </button>
        </div>
      </header>

      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ""}`}>
        {navLinks.map((link) => <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)}>{link.label}</a>)}
        <a href="/contact" onClick={() => setMobileOpen(false)}>Contact</a>
      </div>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.heroBadge}>Get in touch</p>
            <h1>Contact Us</h1>
            <p className={styles.heroDescription}>Have a question about Crowdtolive® or Amana? We&apos;d love to hear from you.</p>
          </div>
        </section>

        <section className={styles.details}>
          <div className={styles.detailsInner}>
            <form className={styles.formCard} onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
              <h2>What&apos;s on your mind?</h2>
              <label>
                Full name
                <input name="name" type="text" autoComplete="name" required placeholder="Jane Smith" />
              </label>
              <div className={styles.fieldGrid}>
                <label>
                  Email address
                  <input name="email" type="email" autoComplete="email" required placeholder="jane@example.com" />
                </label>
                <label>
                  Subject
                  <select name="subject" defaultValue="" required>
                    <option value="" disabled>Select a topic</option>
                    <option>Homebuying with CrowdToLive</option>
                    <option>Amana home deposit builder</option>
                    <option>General enquiry</option>
                  </select>
                </label>
              </div>
              <label>
                Your message
                <textarea name="message" rows={5} required placeholder="Write your message here..." />
              </label>
              <button type="submit" className={styles.submitButton}>Send message <span aria-hidden="true">→</span></button>
              {submitted ? <p className={styles.formNote}>Thanks for getting in touch. Our team will review your message.</p> : null}
            </form>

            <aside className={styles.sidebar}>
              <article className={styles.infoCard}>
                <p className={styles.cardTitle}>Office location</p>
                <div className={styles.cardDivider} />
                <div className={styles.infoRow}>
                  <span className={styles.infoIcon} aria-hidden="true">⌖</span>
                  <div>
                    <span>Address</span>
                    <address>Solar House, 3rd Floor<br />1–9 Romford Road<br />London, England, E15 4LJ</address>
                  </div>
                </div>
              </article>

              <article className={styles.infoCard}>
                <p className={styles.cardTitle}>Email</p>
                <div className={styles.cardDivider} />
                <div className={styles.infoRow}>
                  <span className={styles.infoIcon} aria-hidden="true">✉</span>
                  <div>
                    <span>General enquiries</span>
                    <a href="mailto:info@crowdtolive.com">info@crowdtolive.com</a>
                  </div>
                </div>
              </article>

              <article className={styles.infoCard}>
                <p className={styles.cardTitle}>Follow Crowdtolive®</p>
                <div className={styles.cardDivider} />
                <div className={styles.socialLinks}>
                  {socialLinks.map((link) => (
                    <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                      <span className={styles.socialIcon} aria-hidden="true">{link.icon}</span>
                      <span><strong>{link.label}</strong><small>{link.handle}</small></span>
                    </a>
                  ))}
                </div>
              </article>
            </aside>
          </div>
        </section>
      </main>

      <section className={styles.footerCta}>
        <h2>Ready to get started?</h2>
        <p>Explore shared ownership or start growing your home deposit today.</p>
        <Link href="/" className={styles.registerButton}>Register as Homebuyer</Link>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerTop}>
            <img src="/homepage/logo.png" alt="CrowdToLive by Bayuti" />
            <div className={styles.footerSocials}>
              {socialLinks.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>{link.icon}</a>)}
            </div>
          </div>
          <div className={styles.footerDivider} />
          <p>Crowdtolive® is a registered trading name of Elite Capital and Management Services Limited, which is authorised and regulated by the Financial Conduct Authority (Reference Number: 822039). Elite Capital and Management Services Limited (Companies House number: 10347767) is registered in England and Wales with its registered office at Solar House, 3rd Floor, 1–9 Romford Road, London, England, E15 4LJ.</p>
          <small>© 2026 Crowdtolive® by Bayuti. All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
}
