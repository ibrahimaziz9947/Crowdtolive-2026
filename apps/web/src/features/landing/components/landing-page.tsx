"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import "./landing-page.css";
import type {
  LandingHeroConfig,
  LandingPageConfig,
  LandingSection,
  LandingVariantLink,
} from "../types";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

type PageKind = "startup" | "charity" | "seo" | "testimonials";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function inferPageKind(config: LandingPageConfig): PageKind {
  if (config.hero.layout === "splitCard") return "startup";
  if (config.hero.layout === "splitImpact") return "charity";
  if (config.hero.layout === "splitLeadForm") return "seo";
  return "testimonials";
}

function splitTitle(title: string, highlight?: string) {
  if (!highlight || !title.includes(highlight)) {
    return { before: title, match: "", after: "" };
  }

  const [before, ...rest] = title.split(highlight);

  return {
    before,
    match: highlight,
    after: rest.join(highlight),
  };
}

function getSectionHighlight(title: string) {
  const map: Record<string, string> = {
    "Not a Mortgage. A Movement.": "A Movement.",
    "Backed by the Frameworks That Matter": "That Matter",
    "Questions, Answered Honestly": "Answered Honestly",
    "Changing Lives Through Ethical Finance": "Ethical Finance",
    "Three Steps to Your Own Home": "Your Own Home",
    "Answers to What Families Ask Most": "Families Ask Most",
    "Learn Everything About Islamic Home Finance in the UK":
      "Islamic Home Finance in the UK",
    "CrowdToLive vs Other Islamic Finance Options in the UK":
      "Islamic Finance Options in the UK",
    "Frequently Asked Questions About Islamic Home Finance UK":
      "Islamic Home Finance UK",
    "What Our Customers Say on Trustpilot": "Trustpilot",
    "Hear From Families Just Like Yours": "Just Like Yours",
    "Why You Can Trust CrowdToLive": "CrowdToLive",
    "3 Steps Trusted by Hundreds of Families": "Hundreds of Families",
    "Watch Our Families Tell Their Story": "Tell Their Story",
  };

  return map[title];
}

function ExactLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function GradientTitle({
  title,
  highlight,
  as: Tag = "h2",
  className,
}: {
  title: string;
  highlight?: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  const parts = splitTitle(title, highlight);

  return (
    <Tag className={className}>
      {parts.before}
      {parts.match ? <em>{parts.match}</em> : null}
      {parts.after}
    </Tag>
  );
}

function VersionToolbar({
  items,
  active,
}: {
  items: LandingVariantLink[];
  active: string;
}) {
  return (
    <div className="version-toolbar">
      <span className="vt-label">Testing Variants</span>
      <div className="vt-links">
        {items.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={cx("vt-link", item.href === active && "active")}
          >
            {item.icon} {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function Header({ config }: { config: LandingPageConfig["nav"] }) {
  return (
    <nav>
      <div className="nav-left">
        <div className="nav-logo">
          <Link href={config.logo.href}>
            <img src={config.logo.src} alt={config.logo.alt} />
          </Link>
        </div>
        <div className="nav-links">
          {config.links.map((link, index) => (
            <ExactLink
              key={`${link.label}-${link.href}`}
              href={link.href}
              external={link.external}
              className={cx(index === 0 && "active")}
            >
              {link.label}
            </ExactLink>
          ))}
        </div>
      </div>
      <div className="nav-btns">
        <ExactLink
          href={config.secondaryCta.href}
          external={config.secondaryCta.external}
          className="nav-btn-invest"
        >
          {config.secondaryCta.label}
        </ExactLink>
        <Link href={config.primaryCta.href} className="nav-btn-home">
          {config.primaryCta.label}
        </Link>
      </div>
    </nav>
  );
}

function HeroButtons({ hero }: { hero: LandingHeroConfig }) {
  return (
    <div className="hero-btns">
      <Link href={hero.primaryCta.href} className="btn-grad">
        {hero.primaryCta.label}
      </Link>
      {hero.secondaryCta ? (
        <ExactLink href={hero.secondaryCta.href} className="btn-ghost">
          {hero.secondaryCta.label}
        </ExactLink>
      ) : null}
    </div>
  );
}

function HeroStats({ stats }: { stats: LandingHeroConfig["stats"] }) {
  if (!stats?.length) return null;

  return (
    <div className="hero-stats">
      {stats.map((stat) => (
        <div key={`${stat.value}-${stat.label}`} className="hstat">
          <div className="n">{stat.value}</div>
          <div className="l">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

function HeroCard({ hero, kind }: { hero: LandingHeroConfig; kind: PageKind }) {
  if (!hero.cardRows?.length) return null;

  if (kind === "charity") {
    return (
      <div className="impact-card">
        {hero.cardRows.map((row) => (
          <div key={`${row.label}-${row.value}`} className="impact-row">
            <span className="lbl">{row.label}</span>
            <span className={cx("val", row.gradientValue && "grad")}>{row.value}</span>
            {row.sub ? (
              <span className="note">{row.sub}</span>
            ) : (
              <span className="note-plain">{row.value}</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="hero-card">
      {hero.cardRows.map((row) => (
        <div key={`${row.label}-${row.value}`} className="hero-card-item">
          <div className="label">{row.label}</div>
          <div className="value">{row.value}</div>
          {row.sub ? <div className="sub">{row.sub}</div> : null}
        </div>
      ))}
    </div>
  );
}

function LeadForm({ hero }: { hero: LandingHeroConfig }) {
  if (!hero.leadForm) return null;

  return (
    <div className="lead-form">
      <h3>{hero.leadForm.title}</h3>
      {hero.leadForm.fields.map((field) => (
        <div key={field.label} className="field">
          <label>{field.label}</label>
          {field.type === "select" ? (
            <select defaultValue={field.options?.[0]}>
              {field.options?.map((option) => <option key={option}>{option}</option>)}
            </select>
          ) : (
            <input type={field.type} placeholder={field.placeholder} />
          )}
        </div>
      ))}
      <Link href="/register" className="form-btn">
        {hero.leadForm.submitLabel}
      </Link>
      <p className="form-note">{hero.leadForm.note}</p>
    </div>
  );
}

function Hero({ hero, kind }: { hero: LandingHeroConfig; kind: PageKind }) {
  const highlight = hero.titleGradientText;

  if (kind === "testimonials") {
    return (
      <div className="hero testimonials">
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />
        <div className="hero-inner testimonials">
          {hero.ratingBadgeText ? (
            <div className="rating-badge">
              <span className="rating-stars">{hero.ratingStarsText}</span>
              <span>{hero.ratingBadgeText}</span>
            </div>
          ) : null}
          <GradientTitle
            title={hero.title}
            highlight={highlight}
            as="h1"
            className="hero-title"
          />
          <p>{hero.subtitle}</p>
          <HeroButtons hero={hero} />
          <HeroStats stats={hero.stats} />
        </div>
      </div>
    );
  }

  return (
    <div className={cx("hero", kind)}>
      <div className="hero-glow-1" />
      <div className="hero-glow-2" />
      <div className={cx("hero-inner", kind)}>
        <div>
          {kind === "startup" && hero.badgeText ? (
            <div className="hero-badge">
              <span className="badge-dot" />
              {hero.badgeText}
            </div>
          ) : null}
          {kind === "charity" && hero.badgeText ? (
            <div className="hero-chip">
              {hero.badgeIcon ? `${hero.badgeIcon} ` : null}
              {hero.badgeText}
            </div>
          ) : null}
          {kind === "seo" && hero.breadcrumb?.length ? (
            <div className="breadcrumb">
              {hero.breadcrumb.map((crumb, index) => (
                <span key={`${crumb.label}-${index}`}>
                  {index === 0 ? (
                    <a href={crumb.href ?? "#"}>{crumb.label}</a>
                  ) : (
                    crumb.label
                  )}
                  {index < hero.breadcrumb!.length - 1 ? " / " : ""}
                </span>
              ))}
            </div>
          ) : null}
          <GradientTitle
            title={hero.title}
            highlight={highlight}
            as="h1"
            className="hero-title"
          />
          <p className={kind === "seo" ? "hero-sub" : undefined}>{hero.subtitle}</p>
          {kind === "seo" && hero.tags?.length ? (
            <div className="tag-row">
              {hero.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
          <HeroButtons hero={hero} />
          <HeroStats stats={hero.stats} />
        </div>
        <div>{kind === "seo" ? <LeadForm hero={hero} /> : <HeroCard hero={hero} kind={kind} />}</div>
      </div>
    </div>
  );
}

function SectionHeading({
  chip,
  chipGreen,
  title,
  subtitle,
  useSectionChip = false,
  leadClass = "lead",
}: {
  chip?: string;
  chipGreen?: boolean;
  title: string;
  subtitle?: string;
  useSectionChip?: boolean;
  leadClass?: "lead" | "lead-text";
}) {
  return (
    <>
      {chip ? (
        <span className={cx(useSectionChip ? "section-chip" : "chip", chipGreen && "green")}>
          {chip}
        </span>
      ) : null}
      <GradientTitle title={title} highlight={getSectionHighlight(title)} as="h2" />
      {subtitle ? <p className={leadClass}>{subtitle}</p> : null}
    </>
  );
}

function renderSection(section: LandingSection, kind: PageKind) {
  switch (section.type) {
    case "backedBy":
      return (
        <div className="backed-section">
          <div className="backed-inner">
            <div className="backed-label">{section.label}</div>
            <div className="backed-logos">
              {section.items.map((item) => (
                <div
                  key={`${item.title}-${item.subtitle}`}
                  className={cx(
                    "backed-logo",
                    item.title === "Virgin" && "bl-virgin",
                    item.title === "Barclays" && "bl-barclays",
                    item.title === "London" && "bl-london",
                    item.title === "REACH" && "bl-reach",
                    item.title === "NatWest" && "bl-natwest",
                    item.title === "Second Century" && "bl-scv",
                  )}
                >
                  <span className="logo-icon">{item.icon}</span>
                  <div>
                    <div className="logo-text">{item.title}</div>
                    <div className="logo-sub">{item.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "numbers":
      if (kind === "startup") {
        return (
          <div className="numbers-section">
            <div className="numbers-inner">
              <div className="numbers-title">{section.title}</div>
              <div className="numbers-grid">
                {section.items.map((item) => (
                  <div key={`${item.value}-${item.label}`} className="num-card">
                    <div className="num">{item.value}</div>
                    <div className="num-label">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="section">
          <div className="section-inner">
            <div className="impact-nums">
              {section.items.map((item) => (
                <div key={`${item.value}-${item.label}`} className="num-card charity-num">
                  <div className="big">{item.value}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "cards":
      if (kind === "startup") {
        return (
          <div className="section" id={section.id}>
            <div className="section-inner">
              <SectionHeading
                chip={section.chip}
                title={section.title}
                subtitle={section.subtitle}
                useSectionChip
              />
              <div className="cards">
                {section.items.map((item) => (
                  <div key={item.title} className="card">
                    <div className="card-icon">{item.icon}</div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="card-accent" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="section" id={section.id}>
          <div className="section-inner">
            <SectionHeading chip={section.chip} title={section.title} subtitle={section.subtitle} leadClass="lead-text" />
            <div className="pillars">
              {section.items.map((item) => (
                <div key={item.title} className="pillar">
                  <span className="pillar-icon">{item.icon}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "steps":
      if (kind === "startup") {
        return (
          <div className="steps-section" id={section.id}>
            <div className="steps-inner">
              <SectionHeading chip={section.chip} title={section.title} useSectionChip />
              <div className="steps startup-steps">
                {section.items.map((item, index) => (
                  <div key={item.title} className="step">
                    <div className="step-num">{index + 1}</div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      if (kind === "charity") {
        return (
          <div className="section" id={section.id}>
            <div className="section-inner">
              <SectionHeading chip={section.chip} chipGreen title={section.title} leadClass="lead-text" />
              <div className="steps charity-steps">
                {section.items.map((item) => (
                  <div key={item.title} className="step-card">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
              {section.eligibilityText ? <div className="eligibility-bar charity">{section.eligibilityText}</div> : null}
            </div>
          </div>
        );
      }

      return (
        <div className="how-section" id={section.id}>
          <div className="section-inner">
            <SectionHeading chip={section.chip} title={section.title} />
            <div className="how-cards">
              {section.items.map((item, index) => (
                <div key={item.title} className="how-card">
                  <div className="step-n">{index + 1}</div>
                  {item.icon ? <span className="icon">{item.icon}</span> : null}
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
            {section.eligibilityText ? <div className="eligibility-bar testimonials">{section.eligibilityText}</div> : null}
          </div>
        </div>
      );

    case "institutions":
      return (
        <div className="inst-section" id={section.id}>
          <div className="section-inner">
            <SectionHeading
              chip={section.chip}
              chipGreen={section.chipTone === "green"}
              title={section.title}
              subtitle={section.subtitle}
              useSectionChip
            />
            <div className="inst-grid">
              {section.items.map((item) => (
                <div key={item.title} className="inst-card">
                  <div className="inst-icon">{item.icon}</div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "faq":
      if (kind === "startup") {
        return (
          <div className="section" id={section.id}>
            <div className="section-inner">
              <SectionHeading chip={section.chip} title={section.title} useSectionChip />
              <div className="faq">
                {section.items.map((item) => (
                  <div key={item.question} className="faq-item">
                    <h4>{item.question}</h4>
                    <p>{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      if (kind === "charity") {
        return (
          <div className="faq-section charity" id={section.id}>
            <div className="section-inner">
              <SectionHeading chip={section.chip} title={section.title} />
              <div className="faq-grid charity">
                {section.items.map((item) => (
                  <div key={item.question} className="faq-card">
                    <h4>{item.question}</h4>
                    <p>{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="faq-section seo" id={section.id}>
          <div className="section-inner">
            <SectionHeading chip={section.chip} title={section.title} subtitle={section.subtitle} leadClass="lead-text" />
            <div className="faq-grid seo">
              {section.items.map((item) => (
                <div key={item.question} className="faq-card">
                  <h4>{item.question}</h4>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "cta":
      return (
        <div className={cx("cta-section", kind)}>
          {kind === "charity" || kind === "testimonials" ? <div className="cta-glow" /> : null}
          <h2>{section.title}</h2>
          <p>{section.subtitle}</p>
          <Link href={section.ctaHref} className="btn-white">
            {section.ctaLabel}
          </Link>
          {section.note ? <div className="cta-note">{section.note}</div> : null}
        </div>
      );

    case "charityLogos":
      return (
        <div className="charity-logos">
          <div className="charity-logos-inner">
            <div className="charity-logos-label">{section.label}</div>
            <div className="charity-logo-grid">
              {section.items.map((item, index) =>
                item.type === "image" ? (
                  <div
                    key={`${item.alt}-${index}`}
                    className={cx("cl-card", item.alt.includes("National Waqf") && "cl-nwaqf")}
                  >
                    <img src={item.src} alt={item.alt} className={item.className} />
                  </div>
                ) : (
                  <div
                    key={`${item.name}-${index}`}
                    className={cx(
                      "cl-card",
                      item.tone === "emerald" && "cl-eman",
                      item.tone === "purple" && "cl-human",
                    )}
                  >
                    <div>
                      <div className="cl-name">{item.name}</div>
                      {item.subtitle ? <div className="cl-sub">{item.subtitle}</div> : null}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      );

    case "mission":
      return (
        <div className="mission-banner" id={section.id}>
          <h2>{section.title}</h2>
          <p>{section.subtitle}</p>
        </div>
      );

    case "story":
      return (
        <div className="story-section" id={section.id}>
          <div className="section-inner">
            <SectionHeading chip={section.chip} chipGreen title={section.title} />
            <div className="story-card">
              <span className="stars">{section.starsText}</span>
              <blockquote>{section.quote}</blockquote>
              <div className="author">
                <div className="avatar">{section.author.initials}</div>
                <div>
                  <div className="author-name">{section.author.name}</div>
                  <div className="author-role">{section.author.role}</div>
                  <div className="verified-tag">{section.author.badge}</div>
                </div>
              </div>
            </div>
            <p className="story-note">{section.note}</p>
          </div>
        </div>
      );

    case "trustBar":
      return (
        <div className="trust-bar">
          <div className="trust-inner">
            {section.items.map((item) =>
              section.pill ? (
                <div key={item.text} className="trust-pill">
                  {item.icon} {item.text}
                </div>
              ) : (
                <div key={item.text} className="trust-item">
                  {item.icon} {item.text}
                </div>
              ),
            )}
          </div>
        </div>
      );

    case "articles":
      return (
        <div className="section" id={section.id}>
          <div className="section-inner">
            <SectionHeading chip={section.chip} title={section.title} subtitle={section.subtitle} leadClass="lead-text" />
            <div className="article-grid">
              {section.items.map((item) => (
                <div key={item.title} className="article-card">
                  <span className="article-badge">{item.badge}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="article-meta">{item.meta}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "whyGrid":
      return (
        <div className="why-section" id={section.id}>
          <div className="why-inner">
            <SectionHeading chip={section.chip} title={section.title} subtitle={section.subtitle} leadClass="lead-text" />
            <div className="why-grid">
              {section.items.map((item) => (
                <div key={item.title} className="why-card">
                  <div className="icon">{item.icon}</div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "compare":
      return (
        <div className="section" id={section.id}>
          <div className="section-inner">
            <SectionHeading chip={section.chip} chipGreen title={section.title} />
            <div className="compare-wrap">
              <table>
                <thead>
                  <tr>
                    {section.headers.map((header) => (
                      <th key={header}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.cells.map((cell, cellIndex) => (
                        <td
                          key={`${rowIndex}-${cellIndex}`}
                          className={cx(
                            cell.tone === "yes" && "yes",
                            cell.tone === "no" && "no",
                            cell.tone === "best" && "best-col",
                          )}
                        >
                          {cell.text}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );

    case "trustpilot":
      return (
        <div className="section" id={section.id}>
          <div className="section-inner">
            <SectionHeading chip={section.chip} chipGreen title={section.title} subtitle={section.subtitle} leadClass="lead-text" />
            <div className="tp-widget">
              <div className="tp-name">{section.widget.name}</div>
              <div style={{ fontSize: ".85rem", opacity: ".8", marginBottom: "4px" }}>
                {section.widget.account}
              </div>
              <div className="tp-score">{section.widget.score}</div>
              <div className="tp-stars">{section.widget.starsText}</div>
              <div className="tp-label">{section.widget.label}</div>
              <div className="tp-bars">
                {section.widget.bars.map((bar) => (
                  <div key={bar.label} className="tp-row">
                    <span className="lbl">{bar.label}</span>
                    <div className="tp-bar-bg">
                      <div className="tp-bar-fill" style={{ width: bar.width }} />
                    </div>
                    <span className="pct">{bar.percent}</span>
                  </div>
                ))}
              </div>
              <a href={section.widget.ctaHref} className="tp-cta" target="_blank" rel="noreferrer">
                {section.widget.ctaLabel}
              </a>
            </div>
          </div>
        </div>
      );

    case "reviews":
      return (
        <div className="dark-section" id={section.id}>
          <div className="section-inner">
            <SectionHeading chip={section.chip} title={section.title} subtitle={section.subtitle} leadClass="lead-text" />
            <div className="reviews-grid">
              {section.items.map((item, index) => (
                <div key={`${item.author.name}-${index}`} className={cx("review-card", item.featured && "featured")}>
                  {item.featured ? <div className="featured-label">Featured</div> : null}
                  <div className="review-stars">{item.starsText}</div>
                  <p className="review-text">{item.quote}</p>
                  <div className="reviewer">
                    <div className="rev-avatar">{item.author.initials}</div>
                    <div>
                      <div className="rev-name">{item.author.name}</div>
                      <div className="rev-meta">{item.author.meta}</div>
                      <div className="verified">{item.author.badge}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "credibility":
      return (
        <div className="cred-section" id={section.id}>
          <div className="section-inner">
            <SectionHeading chip={section.chip} title={section.title} subtitle={section.subtitle} leadClass="lead-text" />
            <div className="cred-grid">
              {section.items.map((item) => (
                <div key={`${item.value}-${item.label}`} className="cred-card">
                  <span className="cred-icon">{item.icon}</span>
                  <div className="cred-num">{item.value}</div>
                  <div
                    className="cred-label"
                    dangerouslySetInnerHTML={{ __html: item.label.replaceAll("\n", "<br>") }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "video":
      return (
        <div className="video-section">
          <div className="video-wrap">
            <SectionHeading chip={section.chip} title={section.title} subtitle={section.subtitle} leadClass="lead-text" />
            <a href={section.ctaHref} target="_blank" rel="noreferrer" className="video-btn">
              <div className="play">▶</div>
              <strong>{section.ctaLabel}</strong>
              <span>{section.ctaSubtitle}</span>
            </a>
          </div>
        </div>
      );
  }
}

function Footer({ config }: { config: LandingPageConfig["footer"] }) {
  return (
    <footer>
      <div className="footer-social">
        {config.socialLinks.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ))}
      </div>
      <p>{config.legalText}</p>
    </footer>
  );
}

function LandingStyles() {
  return null;
}

export function LandingPageView({ config }: { config: LandingPageConfig }) {
  const pathname = usePathname();
  const kind = inferPageKind(config);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // The browser environment can inject DOM attributes before React hydrates.
  // Rendering this feature after mount avoids false landing-page hydration mismatches.
  if (!isMounted) {
    return null;
  }

  return (
    <div className={`${inter.className} lp-root ${kind}-page`}>
      <VersionToolbar items={config.variantLinks} active={pathname} />
      <Header config={config.nav} />
      <Hero hero={config.hero} kind={kind} />
      {config.sections.map((section, index) => (
        <div key={`${section.type}-${index}`}>{renderSection(section, kind)}</div>
      ))}
      <Footer config={config.footer} />
      <LandingStyles />
    </div>
  );
}
