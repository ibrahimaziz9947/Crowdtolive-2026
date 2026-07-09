"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { Figtree, Montserrat, Poppins } from "next/font/google";
import { useEffect, type ReactNode } from "react";
import { homepageContent, type HomepageSocialLink, type HomepageStep } from "../content";
import styles from "./homepage.module.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-home-figtree",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-home-poppins",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-home-montserrat",
});

function MultiLineHeading({
  as: Tag,
  lines,
  className,
}: {
  as: "h1" | "h2";
  lines: readonly string[];
  className?: string;
}) {
  return (
    <Tag className={className}>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`} className={styles.headingLine}>
          {line}
        </span>
      ))}
    </Tag>
  );
}

function PrimaryAction({ action }: { action: { label: string; note?: string; href: string } }) {
  return (
    <Link href={action.href} className={styles.ctaButton}>
      {action.label}
      {action.note ? <span>{action.note}</span> : null}
    </Link>
  );
}

function BenefitCheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 512 512"
      className={styles.benefitIcon}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
    </svg>
  );
}

function StepIcon({ step }: { step: HomepageStep }) {
  if (step.icon === "home") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.stepIcon} xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9 21H7C4.79086 21 3 19.2091 3 17V10.7076C3 9.30887 3.73061 8.01175 4.92679 7.28679L9.92679 4.25649C11.2011 3.48421 12.7989 3.48421 14.0732 4.25649L19.0732 7.28679C20.2694 8.01175 21 9.30887 21 10.7076V17C21 19.2091 19.2091 21 17 21H15M9 21V17C9 15.3431 10.3431 14 12 14C13.6569 14 15 15.3431 15 17V21M9 21H15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    );
  }

  if (step.icon === "box") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.stepIcon} xmlns="http://www.w3.org/2000/svg">
        <path d="M2.6954 7.18536L11.6954 11.1854L12.3046 9.81464L3.3046 5.81464L2.6954 7.18536Z" fill="currentColor" />
        <path d="M12.75 21.5V10.5H11.25V21.5H12.75Z" fill="currentColor" />
        <path d="M12.3046 11.1854L21.3046 7.18536L20.6954 5.81464L11.6954 9.81464L12.3046 11.1854Z" fill="currentColor" />
        <path
          d="M3 17.1101V6.88992C3 6.65281 3.13964 6.43794 3.35632 6.34164L11.7563 2.6083C11.9115 2.53935 12.0885 2.53935 12.2437 2.6083L20.6437 6.34164C20.8604 6.43794 21 6.65281 21 6.88992V17.1101C21 17.3472 20.8604 17.5621 20.6437 17.6584L12.2437 21.3917C12.0885 21.4606 11.9115 21.4606 11.7563 21.3917L3.35632 17.6584C3.13964 17.5621 3 17.3472 3 17.1101Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M7.5 4.5L16.1437 8.34164C16.3604 8.43794 16.5 8.65281 16.5 8.88992V12.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.stepIcon} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 21H21V12C21 9.61305 20.0518 7.32387 18.364 5.63604C16.6761 3.94821 14.3869 3 12 3C9.61305 3 7.32387 3.94821 5.63604 5.63604C3.94821 7.32387 3 9.61305 3 12V21Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M3 17L21 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M9 17V13H21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M13 13V9H20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function SocialIcon({ icon }: { icon: HomepageSocialLink["icon"] }) {
  const icons: Record<HomepageSocialLink["icon"], ReactNode> = {
    facebook: (
      <svg viewBox="0 0 512 512" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
      </svg>
    ),
    youtube: (
      <svg viewBox="0 0 576 512" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
      </svg>
    ),
    instagram: (
      <svg viewBox="0 0 448 512" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 448 512" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
      </svg>
    ),
    tiktok: (
      <svg viewBox="0 0 448 512" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
      </svg>
    ),
  };

  return icons[icon];
}

export function HomepageView() {
  useEffect(() => {
    const scrollToHashTarget = () => {
      const hash = window.location.hash.slice(1);

      if (!hash) {
        return;
      }

      const target = document.getElementById(decodeURIComponent(hash));

      if (!target) {
        return;
      }

      window.requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };

    scrollToHashTarget();
    window.addEventListener("hashchange", scrollToHashTarget);

    return () => {
      window.removeEventListener("hashchange", scrollToHashTarget);
    };
  }, []);

  return (
    <main className={`${figtree.variable} ${poppins.variable} ${montserrat.variable} ${styles.homepage}`}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.logoLink} aria-label="CrowdToLive home">
            <img src={homepageContent.logo.src} alt={homepageContent.logo.alt} className={styles.logo} />
          </Link>
        </div>
      </header>

      <section className={styles.heroSection}>
        <video
          className={styles.heroVideo}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          aria-hidden="true"
          src={homepageContent.hero.backgroundVideoSrc}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>{homepageContent.hero.eyebrow}</p>
          <MultiLineHeading as="h1" lines={homepageContent.hero.titleLines} className={styles.heroTitle} />
          <div className={styles.heroCopy}>
            {homepageContent.hero.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className={styles.heroActionWrap}>
            <PrimaryAction action={homepageContent.hero.primaryAction} />
          </div>
        </div>
      </section>

      <section className={styles.propertiesSection}>
        <div className={styles.propertiesInner}>
          <p className={styles.propertiesText}>
            <span>Properties accepted:</span>
            {homepageContent.acceptedProperties.map((property) => (
              <span key={property} className={styles.propertyItem}>
                <img src="/homepage/check.svg" alt="" aria-hidden="true" className={styles.propertyIcon} />
                {property}
              </span>
            ))}
          </p>
        </div>
      </section>

      <section className={styles.benefitsSection}>
        <div className={styles.benefitsInner}>
          <div className={styles.benefitsIntro}>
            <p className={styles.sectionEyebrow}>{homepageContent.benefits.eyebrow}</p>
            <h2 className={styles.sectionTitle}>{homepageContent.benefits.title}</h2>
          </div>
          <div className={styles.benefitList}>
            {homepageContent.benefits.items.map((item) => (
              <article key={item.title} className={styles.benefitItem}>
                <BenefitCheckIcon />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className={styles.storySection}
        style={{ backgroundImage: `linear-gradient(rgba(63, 49, 146, 0.84), rgba(63, 49, 146, 0.84)), url(${homepageContent.story.backgroundImageSrc})` }}
      >
        <div className={styles.storyInner}>
          <div className={styles.storyVideoWrap}>
            <video
              className={styles.storyVideo}
              controls
              preload="metadata"
              controlsList="nodownload"
              poster={homepageContent.story.videoPosterSrc}
              src={homepageContent.story.videoSrc}
            />
          </div>
          <div className={styles.storyContent}>
            <MultiLineHeading as="h2" lines={homepageContent.story.titleLines} className={styles.storyTitle} />
            <div className={styles.storyRating}>
              {Array.from({ length: 5 }).map((_, index) => (
                <img key={index} src="/homepage/star.svg" alt="" aria-hidden="true" className={styles.starIcon} />
              ))}
              <em>{homepageContent.story.ratingName}</em>
            </div>
            <div className={styles.storyCopy}>
              {homepageContent.story.quoteParagraphs.map((paragraph) => (
                <p key={paragraph}>
                  <em>{paragraph}</em>
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.stepsSection}>
        <div className={styles.stepsInner}>
          <h2 className={styles.stepsTitle}>{homepageContent.steps.title}</h2>
          <div className={styles.stepsGrid}>
            {homepageContent.steps.items.map((step) => (
              <article key={step.title} className={styles.stepCard}>
                <div className={`${styles.stepIconWrap} ${step.accent === "green" ? styles.stepGreen : styles.stepBlue}`}>
                  <StepIcon step={step} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.secondaryCtaSection}>
        <div className={styles.secondaryCtaInner}>
          <MultiLineHeading as="h2" lines={homepageContent.callToAction.titleLines} className={styles.secondaryCtaTitle} />
          <p className={styles.secondaryCtaText}>{homepageContent.callToAction.description}</p>
          <PrimaryAction action={homepageContent.callToAction.primaryAction} />
        </div>
      </section>

      <section
        id="faq"
        className={styles.faqSection}
        style={{ backgroundImage: `linear-gradient(rgba(63, 49, 146, 0.9), rgba(63, 49, 146, 0.9)), url(${homepageContent.faq.backgroundImageSrc})` }}
      >
        <div className={styles.faqInner}>
          <h2 className={styles.faqTitle}>{homepageContent.faq.title}</h2>
          <div className={styles.faqList}>
            {homepageContent.faq.items.map((item, index) => (
              <details key={item.question} className={styles.faqItem} open={index === 0}>
                <summary className={styles.faqSummary}>
                  <span>{item.question}</span>
                  <span className={styles.faqMarker} aria-hidden="true" />
                </summary>
                <div className={styles.faqAnswer} dangerouslySetInnerHTML={{ __html: item.answerHtml }} />
              </details>
            ))}
          </div>

          <div id="contact" className={styles.socialBlock}>
            <h3 className={styles.socialTitle}>{homepageContent.social.title}</h3>
            <div className={styles.socialList}>
              {homepageContent.social.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className={`${styles.socialLink} ${styles[`social${link.icon.charAt(0).toUpperCase()}${link.icon.slice(1)}`]}`}
                >
                  <SocialIcon icon={link.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.footerLegal}>{homepageContent.footer.legal}</p>
          <Link href="/" className={styles.footerLogoLink} aria-label="CrowdToLive home">
            <img src={homepageContent.logo.src} alt={homepageContent.logo.alt} className={styles.footerLogo} />
          </Link>
        </div>
      </footer>
    </main>
  );
}
