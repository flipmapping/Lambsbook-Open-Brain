import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTags(tagsString: string): string[] {
  return tagsString
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
}
