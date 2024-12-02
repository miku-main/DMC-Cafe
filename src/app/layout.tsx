import "./globals.css";
import { Metadata } from "next";
import RootClient from "./RootClient";

export const metadata: Metadata = {
  title: "DMC Cafe",
  description: "DMC Cafe is a simple tool that helps you stay organized by keeping track of your tasks and deadlines. It lets you prioritize with a time management matrix, get reminders for upcoming due dates, and easily check off what’s done. With a built-in calendar, timer, and clock, DMC makes it easy to stay on top of your schedule.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RootClient>{children}</RootClient> {/* Wrapping with RootClient */}
      </body>
    </html>
  );
}
