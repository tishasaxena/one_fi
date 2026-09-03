import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, de-duplicating conflicting Tailwind utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Promise-based delay, used by the mock API to make loading states observable. */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
