import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, LayoutDashboard, Menu, Phone, ShoppingCart, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";

const menu = [
  {
    label: "Shop",
    links: [
      { to: "/tyres", label: "All Tyres" },
      { to: "/batteries", label: "All Batteries" },
      { to: "/tyre-finder", label: "Tyre Finder" },
      { to: "/battery-finder", label: "Battery Finder" },
      { to: "/brands", label: "Brands" },
      { to: "/offers", label: "Offers & EMI" },
    ],
  },
  {
    label: "Services",
    links: [
      { to: "/services", label: "All Services" },
      { to: "/booking", label: "Book a Slot" },
      { to: "/roadside", label: "24×7 Roadside" },
      { to: "/warranty", label: "Warranty & Claims" },
      { to: "/fleet", label: "Fleet Programme" },
    ],
  },
  {
    label: "Company",
    links: [
      { to: "/about", label: "About Moon" },
      { to: "/locations", label: "Locations" },
      { to: "/gallery", label: "Gallery" },
      { to: "/testimonials", label: "Testimonials" },
      { to: "/blog", label: "Journal" },
      { to: "/careers", label: "Careers" },
      { to: "/franchise", label: "Franchise" },
    ],
  },
];

const flat = [
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const { count, user } = useStore();
  const { pathname } = useLocation();
  const navFlat = user?.role === "admin" ? [...flat, { to: "/admin", label: "Admin" }] : flat;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50">
        <div className="hidden items-center justify-between border-b border-border bg-background px-6 py-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:flex">
          <p>Free fitting · Free rotation for life · GST invoice on every order</p>
          <a href="tel:+919820041001" className="flex items-center gap-2 text-ember">
            <Phone size={12} /> +91 80855 09001
          </a>
        </div>

        <header
          className={`transition-all duration-500 ${
            scrolled
              ? "glass-panel border-b shadow-deep"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <div className="container mx-auto flex items-center justify-between gap-6 px-6 py-4">
            <Link to="/" className="group flex items-center gap-3">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-ember/60">
                <span className="absolute inset-0 rounded-full bg-gradient-ember opacity-20 transition-opacity duration-500 group-hover:opacity-45" />
                <span className="h-3.5 w-3.5 rounded-full bg-gradient-ember" />
              </span>
              <span className="leading-none">
                <span className="block font-display text-2xl tracking-wide">MOON</span>
                <span className="block text-[9px] uppercase tracking-[0.42em] text-muted-foreground">
                  Battery & Tyre
                </span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {menu.map((group) => (
                <div
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => setOpenGroup(group.label)}
                  onMouseLeave={() => setOpenGroup(null)}
                >
                  <button
                    type="button"
                    className="flex items-center gap-1 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {group.label}
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-300 ${
                        openGroup === group.label ? "rotate-180 text-ember" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openGroup === group.label ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-0 top-full w-60 overflow-hidden rounded-md border border-border bg-surface p-2 shadow-deep"
                      >
                        {group.links.map((link) => (
                          <Link
                            key={link.to}
                            to={link.to}
                            className="block rounded-sm px-3 py-2 text-sm text-muted-foreground transition-all duration-200 hover:translate-x-1 hover:bg-surface-2 hover:text-ember"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              ))}
              {navFlat.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors hover:text-foreground ${
                      isActive ? "text-ember" : "text-muted-foreground"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {user?.role === "admin" ? (
                <Link
                  to="/admin"
                  className="hidden rounded-sm border border-ember/50 p-2.5 text-ember transition-colors hover:bg-ember/10 sm:block"
                  aria-label="Admin dashboard"
                  title="Admin dashboard"
                >
                  <LayoutDashboard size={16} />
                </Link>
              ) : null}
              <Link
                to={user ? "/account" : "/login"}
                className="hidden rounded-sm border border-border p-2.5 text-muted-foreground transition-colors hover:border-ember hover:text-ember sm:block"
                aria-label="Account"
              >
                <User size={16} />
              </Link>
              <Link
                to="/cart"
                className="relative rounded-sm border border-border p-2.5 text-muted-foreground transition-colors hover:border-ember hover:text-ember"
                aria-label="Cart"
              >
                <ShoppingCart size={16} />
                {count > 0 ? (
                  <span className="absolute -right-1.5 -top-1.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-gradient-ember px-1 text-[10px] font-bold text-primary-foreground">
                    {count}
                  </span>
                ) : null}
              </Link>
              <Link
                to="/booking"
                className="hidden rounded-sm bg-gradient-ember px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-ember transition-transform duration-300 hover:scale-[1.04] md:block"
              >
                Book a slot
              </Link>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="rounded-sm border border-border p-2.5 text-muted-foreground lg:hidden"
                aria-label="Menu"
              >
                {open ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
        </header>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-background/97 px-6 pb-16 pt-32 backdrop-blur lg:hidden"
          >
            {(user?.role === "admin"
              ? [{ label: "Admin", links: [{ to: "/admin", label: "Admin Dashboard" }] }]
              : []
            )
              .concat([...menu, { label: "More", links: flat }])
              .map((group, gi) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * gi, duration: 0.5 }}
                className="border-b border-border py-5"
              >
                <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-ember">
                  {group.label}
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {group.links.map((link) => (
                    <Link key={link.to} to={link.to} className="text-lg text-muted-foreground">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}