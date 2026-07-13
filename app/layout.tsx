import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://brilliantbeginningsutah.com"),
  title: "Brilliant Beginnings Childcare — Licensed In-Home Daycare in Clinton, UT",
  description:
    "Affordable, licensed in-home daycare in Clinton, UT serving children ages 6 weeks–5 years. CPR-certified staff, meals included, open Mon–Fri 5:00 AM–5:30 PM. Serving Clearfield, Syracuse, Layton & Hill AFB families. Call (801) 513-7750.",
  keywords: [
    "daycare Clinton UT",
    "childcare Clinton Utah",
    "in-home daycare Davis County",
    "infant care Clinton Utah",
    "preschool Clinton Utah",
    "daycare near Hill Air Force Base",
    "daycare Clearfield UT",
    "daycare Syracuse Utah",
    "licensed home daycare Utah",
    "affordable childcare Davis County",
    "early morning daycare Utah",
  ],
  openGraph: {
    title: "Brilliant Beginnings Childcare — Clinton, UT",
    description:
      "Licensed in-home daycare for children 6 weeks–5 years in Clinton, UT. Meals included, CPR-certified, open 5 AM. Serving Davis County families.",
    type: "website",
    url: "https://brilliantbeginningsutah.com",
    siteName: "Brilliant Beginnings Childcare",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Brilliant Beginnings Childcare — Clinton, UT",
    description:
      "Licensed in-home daycare for children 6 weeks–5 years in Clinton, UT. Meals included, CPR-certified, open 5 AM.",
  },
  alternates: {
    canonical: "https://brilliantbeginningsutah.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ChildCare",
  name: "Brilliant Beginnings Childcare",
  description:
    "Licensed in-home daycare in Clinton, UT serving children ages 6 weeks–5 years. CPR-certified staff, meals included, open Monday–Friday 5:00 AM–5:30 PM.",
  url: "https://brilliantbeginningsutah.com",
  telephone: "+18015137750",
  email: "brilliantbeginningschildcare@yahoo.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1783 N 810 W",
    addressLocality: "Clinton",
    addressRegion: "UT",
    postalCode: "84015",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.1394,
    longitude: -112.0608,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "05:00",
      closes: "17:30",
    },
  ],
  priceRange: "$$",
  areaServed: [
    "Clinton, UT",
    "Clearfield, UT",
    "Syracuse, UT",
    "Layton, UT",
    "West Point, UT",
    "Roy, UT",
    "Hill Air Force Base, UT",
  ],
  sameAs: [
    "https://www.facebook.com/profile.php?id=100063513374994",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased font-[family-name:var(--font-nunito)]">
        {children}
      </body>
    </html>
  );
}
