"use client";

import { Lato } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import styles from "./legal-page.module.css";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700", "900"] });

type DocumentId = "terms" | "privacy" | "cookies";

type Section = {
  heading: string;
  paragraphs?: React.ReactNode[];
  items?: React.ReactNode[];
};

const documents: Record<DocumentId, { title: string; introduction: React.ReactNode[]; sections: Section[] }> = {
  terms: {
    title: "Terms and Conditions of Bayuti",
    introduction: [
      <><strong>INVESTOR TERMS AND CONDITIONS</strong></>,
      <><strong>Important Notice.</strong> These Investor Terms and Conditions (the “Conditions”) set out the legally binding agreement between each person who registers on, or otherwise accesses, the crowdfunding platform operated at https://www.bayuti.com (the “Platform”) and Elite Capital and Management Services Limited (company number 10347767, authorised and regulated by the UK Financial Conduct Authority under reference 822039) (the “Service Provider”).</>,
      "These Conditions govern all undertakings, representations, warranties and covenants made by Investors in connection with their participation in any fundraising on the Platform. They supersede all prior terms published or communicated.",
    ],
    sections: [
      { heading: "1. Definitions and Interpretation", paragraphs: ["Capitalised terms not otherwise defined in these Conditions shall bear the meanings given in the Platform glossary and associated documentation. Key definitions include:"], items: [<><strong>Investment Vehicle:</strong> Any legal entity set up to hold Investments on behalf of Investors, such as SPVs.</>, <><strong>Capital Gains Fee:</strong> 15% of any realised capital gains upon property sale or resale of shares. <strong>(not applicable to Wakala or Amana)</strong></>, <><strong>Annual Platform Fee:</strong> 1% per annum charged on the SPV’s initial capital. <strong>(not applicable to Wakala or Amana)</strong></>, <><strong>Transaction Fee:</strong> 1% of the sale amount upon sale of shares via the resale board. <strong>(not applicable to Wakala or Amana)</strong></>, <><strong>Mangopay:</strong> A regulated electronic money institution managing the Platform’s payment services. Other definitions follow those used in the UK Companies Act 2006.</>] },
      { heading: "2. Contractual Status and Eligibility", paragraphs: ["2.1 By pressing the “Invest” button or otherwise indicating assent on the Platform, the Investor: (a) irrevocably accepts these Conditions; and (b) agrees to be bound by the Articles and Legal Documentation.", "2.2 These Conditions, the Articles, and any Shareholder Agreement constitute the full agreement between the Investor, the Company, and the Service Provider.", "2.3 Investors must be over 18 and classified under the Financial Promotion Order 2005 as:"], items: ["Certified High Net Worth Individuals;", "Self-Certified Sophisticated Investors;", "Restricted Investors."].concat(["The Platform is not open to the general public."]) },
      { heading: "3. Use of Investor Information", paragraphs: ["The Investor agrees that their personal and investment information may be used by the Service Provider, its contractors, and third-party providers (e.g., Mangopay) for compliance, verification, and platform functionality."] },
      { heading: "4. Risks and Warnings", paragraphs: ["Investments are speculative and high-risk:"], items: ["There is no guarantee of returns;", "Shares may be illiquid and difficult to sell;", "Returns depend on property performance;", "Professional financial advice is recommended."] },
      { heading: "5. Application, Refusal and De-registration", paragraphs: ["The Service Provider may reject or deregister Investors without reason or compensation. These Conditions remain enforceable thereafter."] },
      { heading: "6. Investment Process", paragraphs: ["6.1 All payments must be made via the Platform using Mangopay. 6.2 No escrow arrangements apply. However, cancellation rights apply within 14 days or until the campaign closes (whichever is earlier). 6.3 Funds may be returned if closing conditions are unmet within 90 days (or extended period), minus banking fees."] },
      { heading: "7. Completion and Share Allocation", paragraphs: ["Completion of a Fundraising is conditional upon:"], items: ["Legal documents finalised;", "Relevant Investment Vehicle in place;", "Subscription funds received;", "AML and ID checks completed."].concat(["Upon completion, shares are allocated and registered. Shares are non-redeemable and non-transferable without consent."]) },
      { heading: "8. Power of Attorney", paragraphs: ["The Investor appoints the Company as attorney to perform necessary investment actions. This power is irrevocable until the Investor ceases to hold shares."] },
      { heading: "9. Confidentiality", paragraphs: ["All investment-related information must be kept confidential, except where:"], items: ["Required by law;", "Shared with advisers under confidentiality;", "Consent is given."].concat(["These obligations last for 2 years post-investment."]) },
      { heading: "10. Investment Fees (not applicable to Wakala or Amana)", items: [<><strong>Annual Platform Fee:</strong> 1% of SPV's initial capital.</>, <><strong>Capital Gains Fee:</strong> 15% on realised capital gains.</>, <><strong>Banking Fees:</strong> Passed through at cost.</>, <><strong>Service Provider Fee:</strong> 3% of investment (plus VAT) payable pre-completion. Remains payable even if funds are refunded due to a legal claim.</>, <><strong>Amendments:</strong> Notice of three months required to change fees.</>] },
      { heading: "11. Dividends", paragraphs: ["Dividends are based on net rental income after fees and repairs. They are credited monthly to the Investor’s e-wallet and may fluctuate."] },
      { heading: "12. Resale Board (not applicable to Wakala or Amana)", paragraphs: ["Available to eligible Investors in active SPVs."], items: ["Share transfers require Platform approval.", "All transactions subject to compliance checks.", <><strong>Resale Fees</strong></>, <><strong>Transaction Fee:</strong> 1% of sale amount</>, <><strong>Capital Gain Fee:</strong> 15% of the profit from capital appreciation is charged</>, "The Platform does not guarantee liquidity or sale prices."] },
      { heading: "13. No Guarantees", paragraphs: ["No guarantee is made regarding fundraising success or investment returns. Platform content is provided “as is.”"] },
      { heading: "14. Manual Adjustments to e-wallet accounts", paragraphs: ["We reserve the right to manually create, update or amend transactions on your account where reasonably necessary to correct an error, resolve a technical or operational issue, reflect a transaction that was agreed or comply with legal or regulatory obligations.", "Any such adjustment will be limited to what is reasonably required to address the relevant issue. We will maintain an internal record of the reason for the adjustment and, where the adjustment materially affects your account balance or investment position, we will notify you as soon as reasonably practicable.", "We will not use this right to alter the commercial terms of any investment or to make discretionary changes that disadvantage you, except where required by law or regulation."] },
      { heading: "15. Communications", paragraphs: ["All notices are sent via the Platform dashboard or email. Investors must ensure their contact details are accurate."] },
      { heading: "16. Access and Security", paragraphs: ["Investors are responsible for their login security. The Service Provider is not liable for unauthorised access unless due to gross negligence."] },
      { heading: "17. Payment Terms", paragraphs: ["Returns are paid through Mangopay. Additional costs may apply for detailed return reports."] },
      { heading: "18. Termination", paragraphs: ["Conditions remain binding until:"], items: ["The Investor ceases to hold shares;", "The Company terminates due to breach, insolvency, or non-payment."] },
      { heading: "19. Limitation of Liability", items: ["No limits on liability for fraud or personal injury.", "Otherwise, liability capped at the invested amount."] },
      { heading: "20. Conflicts of Interest", paragraphs: ["The Company and its Associates may act for other clients or invest on their own behalf. No fiduciary duty is owed to Investors."] },
      { heading: "21. Assignment", paragraphs: ["Investors may not assign their rights without written consent. The Service Provider may assign rights to a successor."] },
      { heading: "22. Variation", paragraphs: ["Conditions may be amended with two months' notice. Continued use constitutes acceptance."] },
      { heading: "23. Severability", paragraphs: ["If any clause is held invalid, the remainder shall remain in force."] },
      { heading: "24. Indemnity", paragraphs: ["The Investor agrees to indemnify the Service Provider and affiliates for any losses arising from breach of these Conditions."] },
      { heading: "25. Governing Law and Jurisdiction", paragraphs: ["These Conditions are governed by the laws of England and Wales, with disputes subject to the non-exclusive jurisdiction of English courts."] },
      { heading: "26. Partner Information", paragraphs: [<>Partners must ensure their information is accurate and up-to-date. Such information may be used by the Service Provider and shared with third parties (e.g., Mangopay) for legal and compliance purposes.</>, <>Mangopay Terms and Conditions can be found on their website: <a href="https://eu-central-1-shared-euc1-02.graphassets.com/A6NPNWwURR3aAqvSW3l08z/cmok4mvso6vad08w6zdji2uaq" target="_blank" rel="noopener noreferrer">Mangopay T&amp;Cs</a>.</>] },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    introduction: ["At Elite Capital and Management Services Limited, we are committed to maintaining the trust and confidence of visitors to our website. We want to assure you that we do not sell, rent, or trade email lists with other companies for marketing purposes.", "This Privacy Policy outlines when and why we collect your personal information, how we use it, the limited circumstances under which we may disclose it to others, and how we keep it secure."],
    sections: [
      { heading: "Who Are We?", paragraphs: ["Bayuti is a product owned and promoted by Elite Capital and Management Services Limited (“we,” “us,” or “our”), a company incorporated in the United Kingdom with its registered office at Solar House, 3rd Floor, 1-9 Romford Road, London, England, E15 4LJ, and Companies House number 10347767.", "Elite Capital and Management Services Limited is authorised and regulated by the Financial Conduct Authority (FCA) in the UK under Firm Reference Number: 822039. As the data controller, Elite Capital and Management Services Limited determines the purposes for which, and the manner in which, your data is processed under the Data Protection Act 2018 (“DPA”) and the General Data Protection Regulation (“GDPR”).", "We are registered with the Information Commissioner’s Office (ICO) to process your personal data under registration number ZA218720."] },
      { heading: "Summary", paragraphs: ["Elite Capital and Management Services Limited is committed to protecting your personal data and privacy. Unless otherwise required by law or to perform our contract with you, we will process your personal data only as described in this policy or as you direct.", "This policy, together with the Investor Terms & Conditions, explains how any personal data we collect from you, or that you provide to us, will be processed by us or any processor on our behalf. It applies to our contract with you, so please read it carefully.", "This policy applies only to the actions of Elite Capital and Management Services Limited and any agents acting on their behalf. It does not extend to any third-party websites, even if accessible via our website."] },
      { heading: "What Data Do We Collect?", items: [<><strong>Contact Information:</strong> Name, address, phone number, and email.</>, <><strong>Know Your Customer (KYC) / Anti-Money Laundering (AML) Information:</strong> Identity verification and source of funds details for regulatory compliance.</>, <><strong>Financial/Investment Information:</strong> Bank account details, financial transactions, and other necessary investment information.</>, <><strong>Communications:</strong> Email and other exchanges with us or third parties acting on our behalf.</>, <><strong>Website Usage:</strong> Usage data via cookies, as detailed in our Cookie Policy.</>, <><strong>Suitability Information:</strong> Quiz responses and declarations to assess suitability for investments.</>, <><strong>Consents:</strong> Marketing preferences and other consents.</>, <><strong>Website Security Information:</strong> Account details, including username and password.</>, <><strong>Technical Information:</strong> IP address and URL data for security and analytical purposes.</>] },
      { heading: "Your Rights", paragraphs: ["Under DPA and GDPR, you have rights, including:"], items: [<><strong>The Right to Be Informed:</strong> Information provided in this Privacy Policy.</>, <><strong>The Right of Access:</strong> Access your data within one month of request.</>, <><strong>The Right to Rectification:</strong> Request data correction if inaccurate.</>, <><strong>The Right to Erasure:</strong> Request deletion of data, subject to legal limitations.</>, <><strong>The Right to Restrict Processing:</strong> Restrict data processing in certain circumstances.</>, <><strong>The Right to Data Portability:</strong> Receive your data in an electronic format.</>, <><strong>The Right to Object:</strong> Object to data processing for specific purposes.</>, <>To exercise these rights, contact us at <a href="mailto:admin@bayuti.com">admin@bayuti.com</a> or call <a href="tel:+442045195563">+44 204 519 5563</a>.</>] },
      { heading: "Complaints", paragraphs: ["We are committed to resolving complaints promptly and professionally. If you have any concerns regarding our service, please contact us at:"], items: [<>Email: <a href="mailto:admin@bayuti.com">admin@bayuti.com</a></>, "Address: Elite Capital and Management Services Limited, Solar House, 3rd Floor, 1-9 Romford Road, London, England, E15 4LJ.", <>Phone: <a href="tel:+442045195563">+44 204 519 5563</a></>, "If unresolved, you may contact the Financial Ombudsman Service (FOS) at:", "Address: Financial Ombudsman Service, Exchange Tower, Harbour Exchange, London, E14 9SR"] },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    introduction: ["At Elite Capital and Management Services Limited, we are committed to maintaining the trust and confidence of visitors to our website. Specifically, we want to assure you that we do not sell, rent, or trade email lists with other companies for marketing purposes.", "Please read this Cookie Policy alongside our Privacy Policy to fully understand when and why we collect your personal information, how we use it, under what limited conditions we may disclose it, and how we keep it secure."],
    sections: [
      { heading: "Who Are We?", paragraphs: ["Bayuti is a product owned and promoted by Elite Capital and Management Services Limited (“we,” “us,” or “our”), a company registered in the United Kingdom, headquartered at Solar House, 3rd Floor, 1-9 Romford Road, London, England, E15 4LJ, Companies House number 10347767.", "Elite Capital and Management Services is authorised and regulated by the Financial Conduct Authority (FCA) in the UK with Firm Reference Number 822039. We operate the Bayuti website and are the data controller for the purposes of the Data Protection Act 2018 (“DPA”) and the General Data Protection Regulation (“GDPR”). Our ICO registration number is ZA218720."] },
      { heading: "Summary", paragraphs: ["Elite Capital and Management Services Limited is committed to protecting your personal data and privacy. We will process your personal data only in accordance with this policy and as otherwise directed by you, unless required by law, ICO guidance, or best practices.", "Any changes we make to this policy will be posted here. You are encouraged to check back frequently, as continued use of the website signifies acceptance of any updates."] },
      { heading: "What Are Cookies?", paragraphs: ["Cookies are small alphanumeric files downloaded to your computer when you visit a website. They serve several purposes, including:"], items: ["Ensuring website functionality (e.g., optimizing speed and user experience)", "Providing convenience (e.g., recording items in an online shopping cart)", "Facilitating marketing efforts", "Cookies do not grant us access to your computer or any information beyond what you voluntarily provide. Most browsers automatically accept cookies, but you can control or disable cookie use via your browser settings. If you disable cookies, some aspects of the website may not function optimally."] },
      { heading: "What Cookies We Use and Why", paragraphs: ["Our website uses third-party services that require cookies to deliver their services effectively. These cookies enable us to improve our product and market it efficiently."], items: ["Distinguish you from other users", "Optimize your browsing experience", "Track and analyze user movement within the site", "Recognize you upon returning to the site", "Record your interactions, including any links you follow", "Market our product to you"] },
      { heading: "Third-Party Providers and Their Cookies", paragraphs: [<><strong>Google Analytics:</strong> Bayuti uses Google Analytics, a web analytics service provided by Google, LLC. Google Analytics uses cookies to help us understand how users interact with our site and compile reports on activity.</>, "Information collected by these cookies, including your IP address, may be transmitted to and stored by Google on servers in the United States. Google may also transfer this information to third parties as required by law or if third parties process information on Google's behalf. Google will not associate your IP address with any other data it holds.", <><strong>Hotjar:</strong> We use Hotjar to analyze how users interact with the Bayuti website and to compile reports on user activity. Hotjar uses cookies for performance tracking but does not record any personal or sensitive data.</>, "Data generated by Hotjar cookies is stored on Amazon Web Services (AWS) servers in Ireland. Hotjar's application and database servers run inside an Amazon Virtual Private Cloud (VPC), ensuring that data is accessible only from application servers.", <><strong>Hubspot:</strong> Bayuti uses Hubspot for marketing purposes, capturing name, email address, user category (e.g., investor or property sponsor), and a log of each page visited on our website. Hubspot collects this information solely for marketing Bayuti products and updates, and it is not sold to third parties.</>, <><strong>ActiveCampaign:</strong> We use ActiveCampaign for email marketing, collecting your name, email address, and marketing preferences. ActiveCampaign uses this data only to provide marketing updates for Bayuti.</>, <><strong>Facebook Pixel:</strong> Our website uses Facebook Pixel cookies to promote and tailor our ads. These cookies enable Facebook to deliver our ads and provide marketing insights. More details about Facebook's cookies and how to adjust your Facebook preferences are available on Facebook's help page.</>] },
    ],
  },
};

function BayutiLogo({ footer = false }: { footer?: boolean }) {
  return (
    <span className={footer ? styles.footerLogo : styles.logo} aria-label="Bayuti">
      <span className={styles.logoName}>Bay<span>u</span>ti</span>
      <span className={styles.logoTagline}>Value investing</span>
    </span>
  );
}

function SocialIcon({ type }: { type: "facebook" | "instagram" | "linkedin" }) {
  const labels = { facebook: "f", instagram: "◎", linkedin: "in" };
  return <span aria-hidden="true" className={`${styles.socialIcon} ${styles[type]}`}>{labels[type]}</span>;
}

export function LegalPage({ documentId }: { documentId: DocumentId }) {
  const document = documents[documentId];
  const [learnOpen, setLearnOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMenus = () => {
    setLearnOpen(false);
    setMobileOpen(false);
  };

  return (
    <div className={`${styles.root} ${lato.className}`}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="https://www.bayuti.com/" className={styles.logoLink} aria-label="Bayuti home"><BayutiLogo /></a>
          <nav className={styles.navigation} aria-label="Primary navigation">
            <a href="https://www.bayuti.com/who-we-are">Who are we?</a>
            <a href="https://www.bayuti.com/how-it-works">How it Works?</a>
            <a href="https://crowdtolive.bayuti.com" target="_blank" rel="noopener noreferrer">Homebuyers</a>
            <div className={styles.learnMenu}>
              <button type="button" onClick={() => setLearnOpen((isOpen) => !isOpen)} aria-expanded={learnOpen} aria-haspopup="menu">Learn <span aria-hidden="true">⌄</span></button>
              {learnOpen ? <div className={styles.learnDropdown} role="menu">
                <a href="https://www.bayuti.com/faq" role="menuitem" onClick={closeMenus}>FAQs</a>
                <a href="https://www.bayuti.com/help-and-support" role="menuitem" onClick={closeMenus}>Help &amp; support</a>
              </div> : null}
            </div>
          </nav>
          <div className={styles.actions}>
            <a href="https://www.bayuti.com/login" className={styles.loginButton}>Login</a>
            <a href="https://www.bayuti.com/sign-up" className={styles.signupButton}>Sign Up</a>
          </div>
          <button type="button" className={styles.mobileMenuButton} onClick={() => setMobileOpen((isOpen) => !isOpen)} aria-label="Toggle navigation" aria-expanded={mobileOpen}><span /><span /><span /></button>
        </div>
        {mobileOpen ? <nav className={styles.mobileNavigation} aria-label="Mobile navigation">
          <a href="https://www.bayuti.com/who-we-are" onClick={closeMenus}>Who are we?</a>
          <a href="https://www.bayuti.com/how-it-works" onClick={closeMenus}>How it Works?</a>
          <a href="https://crowdtolive.bayuti.com" target="_blank" rel="noopener noreferrer" onClick={closeMenus}>Homebuyers</a>
          <a href="https://www.bayuti.com/faq" onClick={closeMenus}>FAQs</a>
          <a href="https://www.bayuti.com/help-and-support" onClick={closeMenus}>Help &amp; support</a>
          <a href="https://www.bayuti.com/login" onClick={closeMenus}>Login</a>
          <a href="https://www.bayuti.com/sign-up" onClick={closeMenus}>Sign Up</a>
        </nav> : null}
      </header>

      <aside className={styles.warningBar} aria-label="Investment risk warning">
        <p><strong>FCA WARNING:</strong> Don&apos;t invest unless you&apos;re prepared to lose all the money you invest. This is a high-risk investment and you are unlikely to be protected if something goes wrong. <a href="https://www.fca.org.uk/investsmart/5-questions-ask-you-invest" target="_blank" rel="noopener noreferrer">Take 2 mins to learn more</a></p>
      </aside>

      <main className={styles.main}>
        <article className={styles.document}>
          <h1>{document.title}</h1>
          <div className={styles.introduction}>{document.introduction.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
          {document.sections.map((section) => (
            <section key={section.heading} className={styles.section}>
              <h2>{section.heading}</h2>
              {section.paragraphs?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              {section.items ? <ul>{section.items.map((item, index) => <li key={index}>{item}</li>)}</ul> : null}
            </section>
          ))}
          {documentId === "terms" ? <p className={styles.execution}>Executed and delivered electronically by the Investor upon confirmation via the Platform.</p> : null}
        </article>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <a href="https://www.bayuti.com/" className={styles.footerLogoLink}><BayutiLogo footer /></a>
              <p>Discover Shariah-compliant investments starting from £50 and grow your wealth with reliable rental income.</p>
              <a href="https://islamiccouncil.com/ifa/" target="_blank" rel="noopener noreferrer" className={styles.ifaBadge}><span>IFA</span> Islamic Finance Advisory</a>
            </div>
            <div className={styles.footerDetails}>
              <p>Bayuti is a registered trading name of Elite Capital and Management Services Limited, which is authorised and regulated by the Financial Conduct Authority (Reference Number: 822039). Elite Capital and Management Services Limited (Companies House number: 10347767) is registered in England and Wales with its registered office at 809 Salisbury House, 29 Finsbury Circus, London EC2M 7AQ.</p>
              <div className={styles.socialLinks} aria-label="Bayuti social media">
                <a href="https://www.facebook.com/bayutiofficial" target="_blank" rel="noopener noreferrer" aria-label="Bayuti on Facebook"><SocialIcon type="facebook" /></a>
                <a href="https://www.instagram.com/bayuti_official?igsh=MTVqOXB6aDB6bzd5Mw==" target="_blank" rel="noopener noreferrer" aria-label="Bayuti on Instagram"><SocialIcon type="instagram" /></a>
                <a href="https://www.linkedin.com/company/bayuti" target="_blank" rel="noopener noreferrer" aria-label="Bayuti on LinkedIn"><SocialIcon type="linkedin" /></a>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <nav className={styles.footerLinks} aria-label="Footer navigation">
              <Link href="/terms-of-use">Terms of Use</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/cookies-notice">Cookies Notice</Link>
              <a href="https://www.bayuti.com/faq">FAQs</a>
              <a href="https://www.bayuti.com/help-and-support">Help &amp; Support</a>
            </nav>
            <p>© 2026 Bayuti. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
