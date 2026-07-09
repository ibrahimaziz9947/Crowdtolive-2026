"use client";

/* eslint-disable @next/next/no-img-element */

import styles from "./qualification.module.css";

const legalText =
  "Crowdtolive® is a registered trading name of Elite Capital and Management Services Limited, which is authorised and regulated by the Financial Conduct Authority (Reference Number: 822039). Elite Capital and Management Services Limited (Companies House number: 10347767) is registered in England and Wales with its registered office at Solar House, 3rd Floor, 1-9 Romford Road, London, England, E15 4LJ.";

export function QualificationFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLegal}>{legalText}</div>
      <div className={styles.footerLogoRow}>
        <img src="/homepage/logo.png" alt="CrowdToLive by Bayuti" className={styles.footerLogo} />
      </div>
    </footer>
  );
}

