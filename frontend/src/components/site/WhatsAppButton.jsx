import { useState } from "react";

// Change this to your real WhatsApp Business number: country code + number,
// no "+", no spaces, no dashes (e.g. India: 91 followed by the 10-digit number).
const WHATSAPP_NUMBER = "918085509001";
const DEFAULT_MESSAGE = "Hi! I'd like to know more about your tyres and batteries.";

function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
        <div
      className="fixed bottom-5 right-5 z-50 flex items-center justify-end sm:bottom-7 sm:right-7"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip — desktop hover only, harmless on touch devices since it just never triggers */}
      <span
        className={
          "pointer-events-none absolute right-[calc(100%+0.75rem)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-border bg-surface px-3 py-2 text-xs font-medium text-foreground shadow-deep transition-all duration-300 " +
          (hovered ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0")
        }
      >
        Chat with us on WhatsApp
      </span>

      <a
              
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-ember shadow-ember transition-transform duration-300 hover:scale-110"
      >
        {/* Pulsing ember glow ring — continuous, matches the site's own CTA glow color */}
        <span className="absolute inset-0 animate-ping rounded-full bg-ember opacity-60" />

        {/* WhatsApp glyph */}
        <svg viewBox="0 0 32 32" className="relative h-9 w-9 fill-primary-foreground" aria-hidden="true">
          <path d="M16.001 3C9.11 3 3.5 8.61 3.5 15.5c0 2.42.66 4.68 1.8 6.62L3 29l7.06-2.25a12.44 12.44 0 0 0 5.94 1.5h.01c6.89 0 12.5-5.61 12.5-12.5S22.89 3 16.001 3zm0 22.66h-.01a10.2 10.2 0 0 1-5.2-1.43l-.37-.22-3.89 1.24 1.27-3.79-.24-.39a10.14 10.14 0 0 1-1.55-5.41c0-5.62 4.57-10.19 10.2-10.19 2.72 0 5.28 1.06 7.2 2.99a10.11 10.11 0 0 1 2.98 7.21c0 5.63-4.58 10.2-10.2 10.2zm5.6-7.65c-.31-.15-1.83-.9-2.11-1-.28-.1-.49-.15-.69.16-.2.3-.79 1-.97 1.2-.18.2-.36.23-.67.08-.31-.16-1.3-.48-2.48-1.53-.92-.82-1.53-1.83-1.72-2.13-.18-.3-.02-.47.14-.62.14-.14.31-.36.47-.55.15-.18.2-.3.31-.5.1-.2.05-.38-.02-.53-.08-.15-.69-1.66-.94-2.28-.25-.6-.5-.52-.69-.52-.18-.01-.38-.01-.58-.01-.2 0-.53.08-.8.38-.28.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.25 5.16 4.56.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.83-.75 2.09-1.47.26-.72.26-1.34.18-1.47-.08-.13-.28-.2-.58-.35z" />
        </svg>
      </a>
    </div>
  );
}

export default WhatsAppButton;