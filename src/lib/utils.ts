import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateId = () => {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .slice(0, 5);
};
