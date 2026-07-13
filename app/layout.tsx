import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Brilliant Beginnings Childcare — In-Home Daycare in Clinton, UT",
  description:
    "Licensed in-home daycare in Clinton, UT. Serving children ages 6 weeks – 5 years. Meals included, CPR-certified staff, open 5 AM–5:30 PM Mon–Fri. Call (801) 513-7750.",
  keywords: [
    "daycare Clinton UT",
    "childcare Clinton Utah",
    "in-home daycare Davis County",
    "infant care Clinton",
    "preschool Clinton Utah",
  ],
  openGraph: {
    title: "Brilliant Beginnings Childcare — Clinton, UT",
    description: "Trusted in-home daycare for children 6 weeks–5 years in Clinton, UT.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased font-[family-name:var(--font-nunito)]">
        {children}
      </body>
    </html>
  );
}
