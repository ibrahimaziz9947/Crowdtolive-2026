"use client";

/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { clientEnv } from "@/config/env";
import type {
  JointApplicationAnswer,
  PropertyFoundAnswer,
  RegistrationQualificationState,
} from "../types";
import { initialRegistrationQualificationState } from "../types";
import { QualificationFooter } from "./qualification-footer";
import styles from "./qualification.module.css";
import { SearchSelect } from "./search-select";

type StepKey =
  | "propertyFound"
  | "deposit"
  | "city"
  | "propertyPrice"
  | "jointApplication"
  | "annualSalary"
  | "email";

const steps: StepKey[] = [
  "propertyFound",
  "deposit",
  "city",
  "propertyPrice",
  "jointApplication",
  "annualSalary",
  "email",
];

function StepFrame({
  children,
  titleTop,
  title,
}: {
  children: React.ReactNode;
  titleTop?: string;
  title: string;
}) {
  return (
    <div className={styles.background}>
      <div className={styles.overlay} />
      <div className={styles.card}>
        {titleTop ? <div className={styles.cardTitleTop}>{titleTop}</div> : null}
        <div className={styles.cardTitle}>{title}</div>
        {children}
      </div>
    </div>
  );
}

function Progress({
  stepIndex,
  total,
}: {
  stepIndex: number;
  total: number;
}) {
  const label = `${stepIndex + 1}/${total}`;
  const width = `${((stepIndex + 1) / total) * 100}%`;

  return (
    <div className={styles.progressBlock}>
      <div className={styles.progressLabel}>{label}</div>
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width }} />
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  error,
}: {
  label?: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      {label ? <div className={styles.fieldLabel}>{label}</div> : null}
      {children}
      {error ? <div className={styles.error}>{error}</div> : null}
    </div>
  );
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function formatApiError(raw: unknown): string {
  if (typeof raw !== "string") return "We could not submit your registration. Please try again.";

  try {
    const parsed = JSON.parse(raw) as {
      message?: unknown;
    };

    const message = parsed.message;
    if (!Array.isArray(message)) return raw;

    const lines = message
      .map((item) => {
        if (typeof item !== "object" || item === null) return "";

        const property =
          "property" in item && typeof (item as { property?: unknown }).property === "string"
            ? (item as { property: string }).property
            : "";

        const constraints =
          "constraints" in item && typeof (item as { constraints?: unknown }).constraints === "object"
            ? (item as { constraints: Record<string, string> }).constraints
            : null;

        const firstConstraint = constraints ? Object.values(constraints)[0] ?? "" : "";
        if (!property && !firstConstraint) return "";
        if (!property) return firstConstraint;
        if (!firstConstraint) return property;
        return `${property}: ${firstConstraint}`;
      })
      .filter(Boolean);

    if (lines.length === 0) return raw;

    return lines.join(" ");
  } catch {
    return raw;
  }
}

export function RegistrationWizard() {
  const router = useRouter();
  const [state, setState] = useState<RegistrationQualificationState>(initialRegistrationQualificationState);
  const [stepIndex, setStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [submittedSteps, setSubmittedSteps] = useState<Record<StepKey, boolean>>({
    propertyFound: false,
    deposit: false,
    city: false,
    propertyPrice: false,
    jointApplication: false,
    annualSalary: false,
    email: false,
  });

  const step = steps[stepIndex];
  const total = steps.length;
  const isLast = stepIndex === total - 1;

  const validationError = useMemo(() => {
    if (!submittedSteps[step]) return "";

    switch (step) {
      case "propertyFound":
        return state.propertyFound ? "" : "Please complete this required field.";
      case "deposit":
        return state.depositGbp.trim() ? "" : "Please complete this required field.";
      case "city":
        return state.city.trim() ? "" : "Please complete this required field.";
      case "propertyPrice":
        return state.propertyPriceGbp.trim() ? "" : "Please complete this required field.";
      case "jointApplication":
        return state.jointApplication ? "" : "Please complete this required field.";
      case "annualSalary":
        return state.annualSalaryGbp.trim() ? "" : "Please complete this required field.";
      case "email":
        if (!state.email.trim()) return "Please complete this required field.";
        return isEmail(state.email) ? "" : "Please enter a valid email address.";
    }
  }, [state, step, submittedSteps]);

  const markSubmitted = () =>
    setSubmittedSteps((prev) => ({
      ...prev,
      [step]: true,
    }));

  const canAdvance = () => {
    switch (step) {
      case "propertyFound":
        return Boolean(state.propertyFound);
      case "deposit":
        return Boolean(state.depositGbp.trim());
      case "city":
        return Boolean(state.city.trim());
      case "propertyPrice":
        return Boolean(state.propertyPriceGbp.trim());
      case "jointApplication":
        return Boolean(state.jointApplication);
      case "annualSalary":
        return Boolean(state.annualSalaryGbp.trim());
      case "email":
        return Boolean(state.email.trim()) && isEmail(state.email);
    }
  };

  const onNext = async () => {
    markSubmitted();
    if (!canAdvance()) return;

    if (isLast) {
      setIsSubmitting(true);
      setSubmitError("");

      const payload = {
        propertyFound: state.propertyFound === "yes",
        deposit: Number(state.depositGbp),
        city: state.city,
        propertyPrice: Number(state.propertyPriceGbp),
        jointApplication: state.jointApplication === "joint",
        annualSalary: Number(state.annualSalaryGbp),
        email: state.email,
      };

      try {
        const response = await fetch(`${clientEnv.NEXT_PUBLIC_API_BASE_URL}/api/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        });

        const json = (await response.json()) as
          | {
              success: true;
              data: {
                registrationId?: string;
                status?: string;
              };
            }
          | {
              success: false;
              message?: string;
            };

        if (!response.ok || json.success === false) {
          const message = "message" in json && typeof json.message === "string" ? json.message : "";
          setSubmitError(message ? formatApiError(message) : "We could not submit your registration. Please try again.");
          return;
        }

        const createdId = json.data.registrationId ?? "";
        const returnedStatus = json.data.status ?? "NOT_QUALIFIED";

        if (createdId) {
          sessionStorage.setItem("crowdtolive_registration_id", createdId);
        }
        sessionStorage.setItem("crowdtolive_registration_status", returnedStatus);

        if (returnedStatus === "NOT_QUALIFIED") {
          router.push(createdId ? `/register/not-qualified?registrationId=${encodeURIComponent(createdId)}` : "/register/not-qualified");
          return;
        }

        router.push(createdId ? `/register/not-qualified?registrationId=${encodeURIComponent(createdId)}` : "/register/not-qualified");
      } catch {
        setSubmitError("We could not submit your registration. Please check your connection and try again.");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    setStepIndex((prev) => Math.min(prev + 1, total - 1));
  };

  const onPrev = () => setStepIndex((prev) => Math.max(prev - 1, 0));

  const primaryLabel = isLast ? (isSubmitting ? "Submitting..." : "Continue") : "Next";

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <img src="/homepage/logo.png" alt="CrowdToLive by Bayuti" className={styles.logo} />
      </header>
      <main className={styles.main}>
        {step === "propertyFound" ? (
          <StepFrame titleTop="Takes about 1 minute to complete" title="Have you already found a property to buy?">
            <Field error={validationError}>
              <SearchSelect<PropertyFoundAnswer>
                placeholder="Select an option"
                value={state.propertyFound}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No, still looking" },
                ]}
                onChange={(next) => setState((prev) => ({ ...prev, propertyFound: next }))}
              />
            </Field>
            <Progress stepIndex={stepIndex} total={total} />
            <div className={styles.navRow}>
              <span />
              <button type="button" className={styles.btn} onClick={() => void onNext()}>
                {primaryLabel}
              </button>
            </div>
          </StepFrame>
        ) : null}

        {step === "deposit" ? (
          <StepFrame title="How much deposit do you currently have?">
            <Field error={validationError}>
              <input
                className={styles.control}
                value={state.depositGbp}
                placeholder="Type your deposit in GBP*"
                inputMode="numeric"
                onChange={(event) => setState((prev) => ({ ...prev, depositGbp: event.target.value }))}
              />
            </Field>
            <Progress stepIndex={stepIndex} total={total} />
            <div className={styles.navRow}>
              <button type="button" className={styles.btn} onClick={onPrev}>
                Previous
              </button>
              <button type="button" className={styles.btn} onClick={() => void onNext()}>
                {primaryLabel}
              </button>
            </div>
          </StepFrame>
        ) : null}

        {step === "city" ? (
          <StepFrame title="Which city are you planning to buy a property in?">
            <Field label="City*" error={validationError}>
              <input
                className={styles.control}
                value={state.city}
                placeholder="Type a city"
                onChange={(event) => setState((prev) => ({ ...prev, city: event.target.value }))}
              />
            </Field>
            <Progress stepIndex={stepIndex} total={total} />
            <div className={styles.navRow}>
              <button type="button" className={styles.btn} onClick={onPrev}>
                Previous
              </button>
              <button type="button" className={styles.btn} onClick={() => void onNext()}>
                {primaryLabel}
              </button>
            </div>
          </StepFrame>
        ) : null}

        {step === "propertyPrice" ? (
          <StepFrame title="What's your property price?">
            <Field label="Property Price*" error={validationError}>
              <input
                className={styles.control}
                value={state.propertyPriceGbp}
                placeholder="Property Price"
                inputMode="numeric"
                onChange={(event) => setState((prev) => ({ ...prev, propertyPriceGbp: event.target.value }))}
              />
            </Field>
            <Progress stepIndex={stepIndex} total={total} />
            <div className={styles.navRow}>
              <button type="button" className={styles.btn} onClick={onPrev}>
                Previous
              </button>
              <button type="button" className={styles.btn} onClick={() => void onNext()}>
                {primaryLabel}
              </button>
            </div>
          </StepFrame>
        ) : null}

        {step === "jointApplication" ? (
          <StepFrame title="Is this a joint application?">
            <Field label="Select an option*" error={validationError}>
              <SearchSelect<JointApplicationAnswer>
                placeholder="Select an option"
                value={state.jointApplication}
                options={[
                  { value: "joint", label: "Yes, joint application" },
                  { value: "sole", label: "No, sole application" },
                ]}
                onChange={(next) => setState((prev) => ({ ...prev, jointApplication: next }))}
              />
            </Field>
            <Progress stepIndex={stepIndex} total={total} />
            <div className={styles.navRow}>
              <button type="button" className={styles.btn} onClick={onPrev}>
                Previous
              </button>
              <button type="button" className={styles.btn} onClick={() => void onNext()}>
                {primaryLabel}
              </button>
            </div>
          </StepFrame>
        ) : null}

        {step === "annualSalary" ? (
          <StepFrame title="What is your annual salary range?">
            <Field label="Annual Salary*" error={validationError}>
              <input
                className={styles.control}
                value={state.annualSalaryGbp}
                placeholder="Type your Annual salary in GBP"
                inputMode="numeric"
                onChange={(event) => setState((prev) => ({ ...prev, annualSalaryGbp: event.target.value }))}
              />
            </Field>
            <Progress stepIndex={stepIndex} total={total} />
            <div className={styles.navRow}>
              <button type="button" className={styles.btn} onClick={onPrev}>
                Previous
              </button>
              <button type="button" className={styles.btn} onClick={() => void onNext()}>
                {primaryLabel}
              </button>
            </div>
          </StepFrame>
        ) : null}

        {step === "email" ? (
          <StepFrame title="Confirm Your Email">
            <Field label="Email*" error={validationError}>
              <input
                className={styles.control}
                value={state.email}
                placeholder="Email"
                inputMode="email"
                onChange={(event) => setState((prev) => ({ ...prev, email: event.target.value }))}
              />
            </Field>
            <Progress stepIndex={stepIndex} total={total} />
            {submitError ? <div className={styles.error}>{submitError}</div> : null}
            <div className={styles.navRow}>
              <button type="button" className={styles.btn} onClick={onPrev} disabled={isSubmitting}>
                Previous
              </button>
              <button type="button" className={styles.btn} onClick={() => void onNext()} disabled={isSubmitting}>
                {primaryLabel}
              </button>
            </div>
          </StepFrame>
        ) : null}
      </main>
      <QualificationFooter />
    </div>
  );
}
