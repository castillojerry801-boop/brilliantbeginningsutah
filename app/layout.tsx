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
    "Affordable, licensed in-home daycare in Clinton, UT serving children ages 6 weeks–5 years. CPR-certified staff, meals included, open Mon–Fri 5:00 AM–5:30 PM. Serving Davis County & Weber County families — Clearfield, Syracuse, Layton, Roy & Hill AFB. Call (801) 513-7750.",
  keywords: [
    // Core local
    "daycare Clinton UT",
    "childcare Clinton Utah",
    "home daycare Clinton UT",
    "family daycare Clinton Utah",
    // County-level (covers both sides of the county line)
    "in-home daycare Davis County",
    "home daycare Davis County Utah",
    "childcare Davis County Utah",
    "daycare Weber County Utah",
    "in-home daycare Weber County",
    "home daycare Weber County Utah",
    "childcare Weber County Utah",
    // Zip code searches
    "daycare 84015",
    "childcare 84015",
    // Age-specific
    "infant care Clinton Utah",
    "infant daycare Davis County",
    "baby daycare Clinton UT",
    "toddler daycare Clinton UT",
    "preschool Clinton Utah",
    "preschool daycare Clinton UT",
    // Nearby cities
    "daycare near Hill Air Force Base",
    "Hill AFB childcare",
    "military family daycare Utah",
    "daycare Clearfield UT",
    "daycare Syracuse Utah",
    "childcare Layton Utah",
    "daycare West Point UT",
    "childcare Roy UT",
    "daycare Sunset Utah",
    "daycare Hooper UT",
    // Feature-specific searches
    "early morning daycare Utah",
    "daycare open 5am Utah",
    "licensed home daycare Utah",
    "affordable childcare Davis County",
    "childcare meals included Utah",
    "CPR certified daycare Utah",
  ],
  openGraph: {
    title: "Brilliant Beginnings Childcare — Clinton, UT",
    description:
      "Licensed in-home daycare for children 6 weeks–5 years in Clinton, UT. Meals included, CPR-certified, open 5 AM. Serving Davis County & Weber County families.",
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

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ChildCare",
  name: "Brilliant Beginnings Childcare",
  description:
    "Licensed in-home daycare in Clinton, UT serving children ages 6 weeks–5 years. CPR-certified staff, meals included, open Monday–Friday 5:00 AM–5:30 PM. Conveniently located on the Davis County and Weber County border.",
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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "4",
    bestRating: "5",
    worstRating: "5",
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Allen Emlet" },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody:
        "Brilliant Beginnings Daycare is truly exceptional! The staff are phenomenal—caring, dedicated, and deeply committed to each child's well-being and development.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Gloria Calvillo" },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody:
        "Taylor is amazing and has a loving nature about her. My son thrived in her class, met all his milestones. We highly recommend her!",
    },
  ],
  areaServed: [
    "Davis County, UT",
    "Weber County, UT",
    "Clinton, UT",
    "Clearfield, UT",
    "Syracuse, UT",
    "Layton, UT",
    "West Point, UT",
    "Roy, UT",
    "Sunset, UT",
    "Hooper, UT",
    "Hill Air Force Base, UT",
  ],
  sameAs: [
    "https://www.facebook.com/profile.php?id=100063513374994",
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What ages do you accept?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We accept children ages 6 weeks through 5 years old in our licensed in-home daycare program.",
      },
    },
    {
      "@type": "Question",
      name: "What are your hours?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We're open Monday through Friday, 5:00 AM to 5:30 PM — designed for working parents with early schedules.",
      },
    },
    {
      "@type": "Question",
      name: "Are meals included?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! We provide a nutritious breakfast, lunch, and afternoon snack every day at no extra charge.",
      },
    },
    {
      "@type": "Question",
      name: "How do I enroll or schedule a tour?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fill out the form on our website or call us at (801) 513-7750. We'll reach out within 24 hours to schedule a tour and answer any questions.",
      },
    },
    {
      "@type": "Question",
      name: "Is space limited?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — we maintain a small group size to give every child personalized care. Contact us soon to check current availability.",
      },
    },
    {
      "@type": "Question",
      name: "Do you follow a daily schedule or curriculum?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We follow a daily routine with structured learning activities, outdoor play, meals, and rest time appropriate for each age group.",
      },
    },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased font-[family-name:var(--font-nunito)]">
        {children}
      </body>
    </html>
  );
}
