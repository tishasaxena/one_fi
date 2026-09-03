"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";

/**
 * Debounced search input. Keeps its own text state for responsiveness and
 * pushes the debounced value up.
 */
export function SearchBar({
  value,
  onChange,
  placeholder = "Search phones, laptops, brands…",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [text, setText] = useState(value);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Keep in sync if the parent resets the value (e.g. category change).
  useEffect(() => {
    setText(value);
  }, [value]);

  useEffect(() => () => clearTimeout(timer.current), []);

  function handleChange(next: string) {
    setText(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => onChange(next.trim()), 300);
  }

  return (
    <div className="flex h-11 items-center gap-2 rounded-full border border-border bg-card px-4">
      <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      <input
        type="search"
        inputMode="search"
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search the Marketplace"
        className="flex-1 bg-transparent text-sm font-medium outline-none placeholder:font-normal placeholder:text-muted-foreground"
      />
      {text && (
        <button
          type="button"
          onClick={() => {
            setText("");
            clearTimeout(timer.current);
            onChange("");
          }}
          aria-label="Clear search"
          className="flex size-6 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  );
}
