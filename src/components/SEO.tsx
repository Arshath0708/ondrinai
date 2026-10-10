import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
}

const DEFAULT_TITLE = 'ONDRINAI — Together, We Create a Better Tomorrow';
const DEFAULT_DESCRIPTION =
  'A student-led community initiative in Madurai, Tamil Nadu. Small actions. Shared responsibility. A better tomorrow.';

export function SEO({ title = DEFAULT_TITLE, description = DEFAULT_DESCRIPTION, image }: SEOProps) {
  const fullTitle = title === DEFAULT_TITLE ? title : `${title} — ONDRINAI`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      let tag = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);

    if (image) {
      setMeta('og:image', image, 'property');
      setMeta('twitter:image', image);
    }
  }, [fullTitle, description, image]);

  return null;
}
