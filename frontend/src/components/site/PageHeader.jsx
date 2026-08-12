import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function PageHeader({ eyebrow, title, subtitle, children }) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface/40 grid-noise">
      <div
        className="pointer-events-none absolute -top-32 right-[-10%] h-96 w-96 rounded-full blur-3xl ember-pulse"
        style={{ background: "var(--gradient-ember)", opacity: 0.16 }}
      />
      <div className="container mx-auto px-6 pb-16 pt-32 md:pb-24 md:pt-40">
        <motion.p
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-ember"
        >
          <span className="h-px w-10 bg-gradient-ember" />
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl text-5xl leading-[0.95] md:text-7xl"
        >
          {title}
        </motion.h1>
        {subtitle ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            {subtitle}
          </motion.p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}

export function Crumb({ items }) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-2">
          {item.to ? (
            <Link to={item.to} params={item.params} className="hover:text-ember">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
          {i < items.length - 1 ? <span className="text-steel">/</span> : null}
        </span>
      ))}
    </nav>
  );
}