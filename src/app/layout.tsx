import { inter } from "@/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NYP Technopreneurship Club",
};

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{props.children}</body>
    </html>
  );
}