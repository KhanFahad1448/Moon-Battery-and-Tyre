import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Mail, MapPin, Phone } from "lucide-react";

const columns = [
  {
    title: "Shop",
    links: [
      { to: "/tyres", label: "Tyres" },
      { to: "/batteries", label: "Batteries" },
      { to: "/tyre-finder", label: "Tyre Finder" },
      { to: "/battery-finder", label: "Battery Finder" },
      { to: "/brands", label: "Brands" },
      { to: "/offers", label: "Offers & EMI" },
    ],
  },
  {
    title: "Service",
    links: [
      { to: "/services", label: "Workshop Services" },
      { to: "/booking", label: "Book a Slot" },
      { to: "/roadside", label: "Roadside Assistance" },
      { to: "/warranty", label: "Warranty & Claims" },
      { to: "/fleet", label: "Fleet Programme" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/locations", label: "Locations" },
      { to: "/gallery", label: "Gallery" },
      { to: "/blog", label: "Journal" },
      { to: "/careers", label: "Careers" },
      { to: "/franchise", label: "Franchise" },
    ],
  },
  {
    title: "Support",
    links: [
      { to: "/contact", label: "Contact" },
      { to: "/faq", label: "FAQ" },
      { to: "/testimonials", label: "Reviews" },
      { to: "/account", label: "My Account" },
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms of Service" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface/30 grid-noise">
      <div
        className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "var(--gradient-ember)", opacity: 0.1 }}
      />
      <div className="container relative mx-auto px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ember/60">
                <span className="h-3.5 w-3.5 rounded-full bg-gradient-ember" />
              </span>
              <span className="leading-none">
                <span className="block font-display text-2xl">MOON</span>
                <span className="block text-[9px] uppercase tracking-[0.42em] text-muted-foreground">
                  Battery & Tyre
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Since 1999, Moon Battery and Tyre has kept India moving — premium rubber,
              honest power, and fitment done properly the first time.
            </p>
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-ember" /> +91 80855 09001
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-ember" /> moonbattert&tyre@gmail.com
              </p>
              <p className="flex items-start gap-2">
                <MapPin size={14} className="mt-1 text-ember" /> Golden chowk, booty road, Bariatu Ranchi 
                834009, Jharkhand, India
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="rounded-sm border border-border p-2.5 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-ember hover:text-ember"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-ember">
                  {col.title}
                </p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Moon Battery and Tyre Pvt. Ltd. All rights reserved.</p>
          <p className="uppercase tracking-[0.2em]">UPI · Cards · Net Banking · No-cost EMI</p>
        </div>
      </div>
    </footer>
  );
}