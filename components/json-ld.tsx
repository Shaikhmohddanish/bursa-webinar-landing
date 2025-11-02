"use client";

import Script from "next/script";

export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Bursa Trading Academy Live Webinar",
    "description": "Master the Markets: Learn proven trading strategies that work – not random signals. Join our live webinar for only RM19",
    "startDate": "2025-08-31T11:00+08:00",
    "endDate": "2025-08-31T13:00+08:00",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "location": {
      "@type": "VirtualLocation",
      "url": "https://bursawebinar.online/"
    },
    "image": "https://bursawebinar.online/preview.jpeg",
    "performer": {
      "@type": "Organization",
      "name": "Bursa Trading Academy",
      "url": "https://bursawebinar.online/"
    },
    "organizer": {
      "@type": "Organization",
      "name": "Bursa Trading Academy",
      "url": "https://bursawebinar.online/"
    },
    "offers": {
      "@type": "Offer",
      "price": "49",
      "priceCurrency": "MYR",
      "availability": "https://schema.org/LimitedAvailability",
      "validFrom": "2025-08-01",
      "url": "https://bursawebinar.online/"
    }
  };

  return (
    <Script id="json-ld" type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(jsonLd)}
    </Script>
  );
}
