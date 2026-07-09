"use client";

/* eslint-disable @next/next/no-img-element */

import styles from "./thank-you.module.css";
import { QualificationFooter } from "./qualification-footer";

function GooglePlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 512 512" aria-hidden="true">
      <path
        d="M325.3 234.3L104.6 13.6C96.3 5.3 83.4 3.1 72.8 8.3L300.7 236.2l24.6-1.9z"
        fill="#ffffff"
      />
      <path
        d="M56.2 40.8C52 47.1 50 54.6 50 62.4v387.2c0 7.9 2 15.3 6.2 21.6l237.5-237.5L56.2 40.8z"
        fill="#ffffff"
        opacity="0.9"
      />
      <path
        d="M475.2 246.3l-91.9-53.1-67.9 67.9 67.9 67.9 91.9-53.1c24.5-14.1 24.5-49.5 0-63.6z"
        fill="#ffffff"
      />
      <path
        d="M72.8 503.7c10.6 5.2 23.5 3 31.8-5.3l220.7-220.7-24.6-1.9L72.8 503.7z"
        fill="#ffffff"
        opacity="0.85"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 384 512" aria-hidden="true">
      <path
        fill="#ffffff"
        d="M318.7 268.7c-.3-60.5 49.4-89.5 51.6-90.9-28.1-41-71.8-46.6-87.3-47.2-37.1-3.8-72.5 21.9-91.4 21.9-18.9 0-48.3-21.3-79.3-20.7-40.8.6-78.3 23.7-99.3 60.1-42.4 73.4-10.8 182 30.5 241.5 20.2 29.1 44.2 61.8 75.7 60.6 30.4-1.2 41.9-19.7 78.6-19.7 36.7 0 47.1 19.7 79.3 19.1 32.8-.6 53.5-29.8 73.6-59 23.1-33.7 32.6-66.3 33-68-0.7-0.3-63.3-24.3-63.6-96.7zM258.4 67.9c16.8-20.4 28.2-48.8 25.1-77.9-24.2 1-53.4 16.1-70.7 36.5-15.6 18.1-29.2 47-25.5 74.8 27.1 2.1 54.3-13.8 71.1-33.4z"
      />
    </svg>
  );
}

export function NotQualifiedView() {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <img src="/homepage/logo.png" alt="CrowdToLive by Bayuti" className={styles.logo} />
      </header>
      <main className={styles.main}>
        <div className={styles.background}>
          <div className={styles.overlay} />
          <div className={styles.content}>
            <h1 className={styles.title}>
              Your profile doesn’t fully match our criteria at the
              <br />
              moment
            </h1>
            <p className={styles.copy}>
              Many of our clients start exactly where you are today. What matters is having a clear plan and the right
              guidance to get you there.
            </p>
            <p className={styles.copy}>Our team is here to support you on your journey.</p>
            <p className={styles.copy}>
              You can explore other Bayuti products that can support your homebuyer journey, including Amana by Bayuti,
              designed to help you grow your home purchase deposit.
            </p>
            <div className={styles.storeRow}>
              <a
                className={styles.storeButton}
                href="https://play.google.com/store"
                target="_blank"
                rel="noreferrer"
              >
                <GooglePlayIcon />
                <span className={styles.storeText}>
                  <span className={styles.storeSmall}>Get it on</span>
                  <span className={styles.storeLarge}>Google Play</span>
                </span>
              </a>
              <a
                className={styles.storeButton}
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noreferrer"
              >
                <AppleIcon />
                <span className={styles.storeText}>
                  <span className={styles.storeSmall}>Download on the</span>
                  <span className={styles.storeLarge}>App Store</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </main>
      <QualificationFooter />
    </div>
  );
}

