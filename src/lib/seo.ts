import {
  EVENT_DATE,
  EVENT_VENUE_NAME,
  VENUE_ADDRESS,
  FAQ as FAQ_DATA,
  WORKSHOPS,
  SPEAKERS,
} from "@/data/event";

// ─── Constants ───────────────────────────────────────────────────────────────

const SITE_URL = "https://awsscd-rec.tech";
const SITE_NAME = "AWS Student Community Day Vizag 2026";
const ORG_NAME = "AWS Student Builder Group REC";

/**
 * ISO 8601 date strings for the event.
 * Derived from event.ts: "Saturday, September 19" + agenda 8:30 AM – 5:00 PM IST.
 */
const EVENT_START_ISO = "2026-09-19T08:30:00+05:30";
const EVENT_END_ISO = "2026-09-19T17:00:00+05:30";

// Real social links from the Footer component
const SOCIAL_LINKS = [
  "https://www.linkedin.com/company/aws-cloud-club/",
  "https://www.instagram.com/awsclub_rec",
  "https://youtube.com/@awsstudentbuildergroupatrec",
  "https://www.meetup.com/aws-cloud-club-at-raghu-eng-college",
] as const;

// ─── Schema Generators ──────────────────────────────────────────────────────

/** Schema.org Event (EducationEvent) JSON-LD */
export function getEventJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name: SITE_NAME,
    description:
      "A one-day, community-run AWS conference featuring keynotes, technical talks, and hands-on workshops on cloud computing, AI/ML, DevOps, serverless, containers, and security. Open to students, developers, and cloud enthusiasts.",
    startDate: EVENT_START_ISO,
    endDate: EVENT_END_ISO,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: EVENT_VENUE_NAME,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Dakamarri, Bheemunipatnam Mandal",
        addressLocality: "Visakhapatnam",
        addressRegion: "Andhra Pradesh",
        postalCode: "531162",
        addressCountry: "IN",
      },
    },
    organizer: {
      "@type": "Organization",
      name: ORG_NAME,
      url: SITE_URL,
    },
    image: `${SITE_URL}/og-image.jpeg`,
    url: SITE_URL,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: SITE_URL,
    },
    performer: SPEAKERS.map((s) => ({
      "@type": "Person",
      name: s.name,
      jobTitle: s.role,
      worksFor: {
        "@type": "Organization",
        name: s.company,
      },
    })),
  };
}

/** Schema.org Organization JSON-LD */
export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.png`,
    sameAs: [...SOCIAL_LINKS],
  };
}

/** Schema.org WebSite JSON-LD */
export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

/** Schema.org FAQPage JSON-LD — derived from the visible FAQ section */
export function getFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_DATA.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

// ─── Meta Helpers ────────────────────────────────────────────────────────────

export const SEO_TITLE = `${SITE_NAME} | ${ORG_NAME}`;

export const SEO_DESCRIPTION = `Join ${SITE_NAME} on ${EVENT_DATE} at ${EVENT_VENUE_NAME}, Visakhapatnam — a community-run conference featuring keynotes, technical talks, and hands-on workshops on AWS, AI/ML, DevOps, serverless, and more. Organized by ${ORG_NAME}.`;

export const SEO_URL = SITE_URL;
export const SEO_IMAGE = `${SITE_URL}/og-image.jpeg`;
export const SEO_IMAGE_ALT =
  "AWS Student Community Day Vizag 2026 — 19 September 2026 at Raghu Engineering College";
