import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { db } from "@/lib/db";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const isBlacklistedEmail = async (email: string) => {
//   let blacklistedEmails;
//   try {
//   } catch (e) {
//     blacklistedEmails = [];
//   }
//   return new RegExp(blacklistedEmails.join("|"), "i").test(email);
// };
