import { useEffect } from "react";

const DEFAULT_TITLE = "Moon Battery and Tyre — Premium Tyres & Batteries in India";

function setMetaTag(attr, key, content) {
  if (!content) return;
  let tag = document.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

/**
 * Sets the document title and meta description/og tags for the current page.
 * Replaces TanStack Start's route-level head() export in this plain Vite + React app.
 */
export function useMeta({ title, description } = {}) {
  useEffect(() => {
    document.title = title ? `${title}` : DEFAULT_TITLE;
    if (description) {
      setMetaTag("name", "description", description);
      setMetaTag("property", "og:description", description);
    }
    if (title) {
      setMetaTag("property", "og:title", title);
    }
  }, [title, description]);
}
