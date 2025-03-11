import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeAgo(date:Date | string) {
  const now = new Date();
  const createdDate = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays === 2) return "2 days ago";
  return `${diffInDays} days ago`;
}

export const slugify = (text: string) => {
  return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w-]+/g, "") // Remove non-word characters
      .replace(/--+/g, "-"); // Remove multiple -
};


export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_BASE_URL;
