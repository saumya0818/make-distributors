import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  ogImage?: string;
  schemaType?: 'Organization' | 'WebApplication' | 'Article' | 'FAQPage';
  schemaData?: Record<string, unknown>;
}

export const SEOHelmet: React.FC<SEOProps> = ({
  title = 'Make Distributors – Where Brands Meet Growth Partners.',
  description = 'Connect brands, manufacturers, wholesalers, suppliers, and distributors through Make Distributors. Where Brands Meet Growth Partners.',
  schemaType = 'WebApplication',
  schemaData,
}) => {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // 2. Helper to set or update meta tag
    const setMeta = (nameAttr: string, key: string, content: string) => {
      let element = document.querySelector(`meta[${nameAttr}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameAttr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:site_name', 'Make Distributors');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);

    // 3. Inject Structured Data (JSON-LD)
    const scriptId = 'make-distributors-structured-data';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const defaultSchema = {
      '@context': 'https://schema.org',
      '@type': schemaType,
      name: 'Make Distributors',
      url: window.location.origin,
      description: description,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Make Distributors Marketplace Inc',
        logo: `${window.location.origin}/icon.svg`,
      },
      ...schemaData,
    };

    scriptTag.textContent = JSON.stringify(defaultSchema);
  }, [title, description, schemaType, schemaData]);

  return null;
};

export default SEOHelmet;
