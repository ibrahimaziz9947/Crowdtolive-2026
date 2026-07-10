"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./qualification.module.css";

export interface CountrySelectOption<T extends string> {
  value: T;
  label: string;
  buttonLabel: string;
}

export function CountrySelect<T extends string>({
  placeholder,
  value,
  options,
  onChange,
}: {
  placeholder: string;
  value: T | null;
  options: Array<CountrySelectOption<T>>;
  onChange: (next: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement | null>(null);

  const selected = useMemo(() => options.find((opt) => opt.value === value) ?? null, [options, value]);
  const filtered = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return options;
    return options.filter((opt) => opt.label.toLowerCase().includes(trimmed));
  }, [options, query]);

  useEffect(() => {
    const onDocClick = (event: MouseEvent) => {
      if (!rootRef.current) return;
      if (event.target instanceof Node && rootRef.current.contains(event.target)) return;
      setOpen(false);
    };

    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div ref={rootRef} className={styles.selectWrap}>
      <button
        type="button"
        className={styles.selectButton}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={!selected ? styles.selectButtonPlaceholder : undefined}>
          {selected ? selected.buttonLabel : placeholder}
        </span>
        <span className={styles.caret} aria-hidden="true" />
      </button>
      {open ? (
        <div className={styles.selectPanel}>
          <input
            className={styles.selectSearch}
            value={query}
            placeholder="Search"
            onChange={(event) => setQuery(event.target.value)}
            autoFocus
          />
          <div className={styles.optionList}>
            {filtered.map((option) => (
              <button
                key={option.value}
                type="button"
                className={styles.optionBtn}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                  setQuery("");
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

