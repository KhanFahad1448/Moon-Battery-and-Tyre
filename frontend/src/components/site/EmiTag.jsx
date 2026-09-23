import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CreditCard } from "lucide-react";

const ADMIN_WHATSAPP = "918085509001"; // +91 80855 09001
const WHATSAPP_MESSAGE = "Hi, I want to know more about the EMI facilities.";

// Render this on the homepage (inside the hero section, or directly in
// Home.jsx's return — doesn't matter, both variants use `fixed`
// positioning so they sit relative to the viewport, not any ancestor).
// Not in App.jsx — so it only ever appears on the homepage.
//
// Renders two variants sharing the same open/close state:
//  - Desktop (md and up): tilted card fixed near the top-right, below
//    the header, in the hero's empty visual space.
//  - Mobile (below md): a compact bar fixed to the bottom of the screen,
//    above the WhatsApp bubble.
function EmiTag() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 1100);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ---- Desktop: tilted card, fixed below the header ---- */}
          <motion.div
            key="emi-desktop"
            initial={{ x: 140, opacity: 0, rotate: 0 }}
            animate={{ x: 0, opacity: 1, rotate: -3 }}
            exit={{ x: 100, opacity: 0, rotate: 4, transition: { duration: 0.25 } }}
            transition={{ type: "spring", stiffness: 210, damping: 20, mass: 0.9 }}
            className="fixed right-6 top-28 z-30 hidden w-[280px] origin-top-right md:block lg:right-10 lg:top-32"
          >
            <div className="relative overflow-hidden rounded-lg border border-border bg-surface p-6 shadow-ember">
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-ember" />
              <span className="absolute -top-2 -left-2 h-4 w-4 rounded-full bg-gradient-ember ring-2 ring-background" />

              <button
                onClick={() => setOpen(false)}
                aria-label="Dismiss"
                className="absolute right-4 top-5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2">
                <span className="h-px w-5 bg-gradient-ember" />
                <p className="text-[10px] uppercase tracking-[0.3em] text-ember">
                  Zero Down Payment
                </p>
              </div>

              <p className="mt-3 font-display uppercase leading-[0.85] text-foreground">
                <span className="block text-4xl">Pay in</span>
                <span className="block text-4xl text-gradient-ember">EMIs</span>
              </p>

              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Tyres, batteries or a full service — split the cost, no extra
                paperwork at the counter.
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center rounded-sm bg-gradient-ember px-4 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
              >
                Pay in Easy EMI's
              </a>
            </div>
          </motion.div>

          {/* ---- Mobile: compact bar fixed above the WhatsApp bubble ---- */}
          <motion.div
            key="emi-mobile"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 220, damping: 22, mass: 0.8 }}
            className="fixed inset-x-3 bottom-24 z-30 md:hidden"
          >
            <div className="relative flex items-center gap-3 overflow-hidden rounded-lg border border-border bg-surface p-3 pr-9 shadow-ember">
              <span className="absolute inset-y-0 left-0 w-1 bg-gradient-ember" />

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-ember">
                <CreditCard size={16} className="text-primary-foreground" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[9px] uppercase tracking-[0.25em] text-ember">
                  Zero Down Payment
                </p>
                <p className="truncate text-sm font-semibold text-foreground">
                  Pay in easy EMIs
                </p>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-sm bg-gradient-ember px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-primary-foreground"
              >
                Ask now
              </a>

              <button
                onClick={() => setOpen(false)}
                aria-label="Dismiss"
                className="absolute right-2 top-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X size={15} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default EmiTag;
