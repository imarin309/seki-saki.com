import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/app/meta";

export function GoogleAnalytics() {
  if (
    process.env.NODE_ENV !== "production" ||
    process.env.CF_PAGES_BRANCH !== "main"
  ) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
