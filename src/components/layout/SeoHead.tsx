import { useEffect } from "react";
import { useSiteConfig } from "@/hooks/useSiteConfig";

interface SeoHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}

const SeoHead = ({ title, description, image, type = "website" }: SeoHeadProps) => {
  const { data: config } = useSiteConfig();

  useEffect(() => {
    const siteName = config?.site_name || "Escritório Contábil";
    const metaTitle = title || config?.meta_title || siteName;
    const metaDescription = description || config?.meta_description || config?.site_description || "";
    const ogImage = image || config?.og_image_url || "";
    const canonicalUrl = config?.canonical_url || window.location.origin;
    const keywords = config?.site_keywords || "";

    // Update document title
    document.title = title ? `${title} | ${siteName}` : metaTitle;

    // Helper function to update or create meta tags
    const updateMetaTag = (attribute: string, value: string, content: string) => {
      let meta = document.querySelector(`meta[${attribute}="${value}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, value);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Basic meta tags
    updateMetaTag("name", "description", metaDescription);
    updateMetaTag("name", "keywords", keywords);

    // Open Graph tags
    updateMetaTag("property", "og:title", metaTitle);
    updateMetaTag("property", "og:description", metaDescription);
    updateMetaTag("property", "og:type", type);
    updateMetaTag("property", "og:url", window.location.href);
    updateMetaTag("property", "og:site_name", siteName);
    if (ogImage) {
      updateMetaTag("property", "og:image", ogImage);
    }

    // Twitter Card tags
    updateMetaTag("name", "twitter:card", "summary_large_image");
    updateMetaTag("name", "twitter:title", metaTitle);
    updateMetaTag("name", "twitter:description", metaDescription);
    if (ogImage) {
      updateMetaTag("name", "twitter:image", ogImage);
    }

    // Canonical URL
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.href);

    // Google Tag Manager
    const gtmId = config?.gtm_container_id;
    if (gtmId && !document.querySelector(`script[data-gtm-id="${gtmId}"]`)) {
      // GTM Script
      const gtmScript = document.createElement("script");
      gtmScript.setAttribute("data-gtm-id", gtmId);
      gtmScript.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `;
      document.head.appendChild(gtmScript);

      // GTM noscript fallback
      const gtmNoscript = document.createElement("noscript");
      gtmNoscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
      document.body.insertBefore(gtmNoscript, document.body.firstChild);
    }

    // Google Analytics (alternative)
    const gaId = config?.google_analytics_id;
    if (gaId && !gtmId && !document.querySelector(`script[data-ga-id="${gaId}"]`)) {
      const gaScript = document.createElement("script");
      gaScript.setAttribute("data-ga-id", gaId);
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(gaScript);

      const gaConfigScript = document.createElement("script");
      gaConfigScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');
      `;
      document.head.appendChild(gaConfigScript);
    }
  }, [config, title, description, image, type]);

  return null;
};

export default SeoHead;
