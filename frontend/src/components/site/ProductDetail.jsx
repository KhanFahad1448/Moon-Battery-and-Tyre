import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "motion/react";
import { Check, Heart, Minus, Plus, ShieldCheck, Star, Truck } from "lucide-react";
import { toast } from "sonner";
import { Crumb } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Motion";
import ProductCard from "@/components/site/ProductCard";
import { images, inr } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function ProductDetail({ product, related }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [qty, setQty] = useState(product.kind === "tyre" ? 4 : 1);
  const [tab, setTab] = useState("overview");
  const isTyre = product.kind === "tyre";
  const saved = wishlist.some((w) => w.id === `${product.kind}:${product.slug}`);
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const specs = isTyre
    ? [
        ["Size", product.size],
        ["Type", product.type],
        ["Season", product.season],
        ["Warranty", product.warranty],
        ["Brand", product.brand],
        ["In stock", `${product.stock} units`],
      ]
    : [
        ["Capacity", product.capacity],
        ["Cold cranking", product.cca],
        ["Application", product.type],
        ["Warranty", product.warranty],
        ["Brand", product.brand],
        ["In stock", `${product.stock} units`],
      ];

  return (
    <>
      <section className="border-b border-border bg-surface/30 pt-32">
        <div className="container mx-auto grid gap-12 px-6 py-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-lg border border-border bg-background"
          >
            <img
              src={product.images?.[0]?.url || (isTyre ? images.heroTyre : images.heroBattery)}
              alt={`${product.brand} ${product.name}`}
              className="aspect-square w-full object-cover transition-transform duration-[1.4s] hover:scale-110"
            />
            <span className="absolute left-4 top-4 rounded-sm bg-gradient-ember px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
              Save {off}%
            </span>
          </motion.div>

          <div>
            <Crumb
              items={[
                { label: "Home", to: "/" },
                { label: isTyre ? "Tyres" : "Batteries", to: isTyre ? "/tyres" : "/batteries" },
                { label: product.name },
              ]}
            />
            <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-ember">{product.brand}</p>
            <h1 className="mt-2 text-5xl leading-none md:text-6xl">{product.name}</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              {isTyre ? product.size : `${product.capacity}${product.cca ? ` · ${product.cca} CCA` : ""}`}
            </p>

            {product.rating ? (
              <div className="mt-4 flex items-center gap-2 text-sm">
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.round(product.rating) ? "fill-ember text-ember" : "text-steel"}
                    />
                  ))}
                </span>
                <span className="font-semibold">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews || 0} verified reviews)</span>
              </div>
            ) : null}

            <div className="mt-7 flex items-end gap-4">
              <p className="font-display text-5xl text-gradient-ember">{inr(product.price)}</p>
              <p className="pb-1 text-lg text-muted-foreground line-through">{inr(product.mrp)}</p>
            </div>
            <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
              Inclusive of fitting · 18% GST added at checkout
            </p>

            <p className="mt-6 leading-relaxed text-muted-foreground">{product.description}</p>

            <ul className="mt-6 space-y-2">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-sm">
                  <Check size={15} className="text-ember" /> {h}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-sm border border-border">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="p-3.5 text-muted-foreground hover:text-ember"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center font-semibold">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  className="p-3.5 text-muted-foreground hover:text-ember"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  addToCart(product, qty);
                  toast.success(`${qty} × ${product.name} added to cart`);
                }}
                className="flex-1 rounded-sm bg-gradient-ember px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-ember transition-transform duration-300 hover:scale-[1.02] sm:flex-none"
              >
                Add to cart · {inr(product.price * qty)}
              </button>
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-label="Save"
                className="rounded-sm border border-border p-4 text-muted-foreground transition-colors hover:border-ember hover:text-ember"
              >
                <Heart size={16} className={saved ? "fill-ember text-ember" : ""} />
              </button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-sm border border-border bg-surface p-4">
                <Truck size={17} className="mt-0.5 text-ember" />
                <p className="text-sm text-muted-foreground">
                  {isTyre ? "Free pickup & drop on sets of four" : "Free fitting at your doorstep"}
                </p>
              </div>
              <div className="flex items-start gap-3 rounded-sm border border-border bg-surface p-4">
                <ShieldCheck size={17} className="mt-0.5 text-ember" />
                <p className="text-sm text-muted-foreground">
                  {product.warranty} warranty, claims handled at our counter
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <div className="flex gap-2 border-b border-border">
          {["overview", "specifications", "fitting"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`relative px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-colors ${
                tab === t ? "text-ember" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
              {tab === t ? (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute inset-x-0 -bottom-px h-0.5 bg-gradient-ember"
                />
              ) : null}
            </button>
          ))}
        </div>

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="pt-8"
        >
          {tab === "overview" ? (
            <p className="max-w-3xl leading-relaxed text-muted-foreground">
              {product.description} Every unit we sell is fresh stock, stored in a climate
              controlled rack and fitted by technicians who hold OEM certification. Your invoice
              carries the manufacturing code so you can verify the age yourself.
            </p>
          ) : null}

          {tab === "specifications" ? (
            <dl className="grid max-w-3xl gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
              {specs.filter(([, v]) => v !== undefined && v !== null && v !== "").map(([k, v]) => (
                <div key={k} className="flex justify-between bg-surface px-5 py-4">
                  <dt className="text-sm text-muted-foreground">{k}</dt>
                  <dd className="text-sm font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {tab === "fitting" ? (
            <div className="max-w-3xl space-y-4 text-muted-foreground">
              <p>
                {isTyre
                  ? "Fitting is included in the listed price: touchless mounting, road-force balancing to under five grams, a fresh valve and a nitrogen fill."
                  : "Fitting is free at your home or office. Our technician carries a memory saver so your ECU, clock and radio presets survive the swap."}
              </p>
              <p>
                Turnaround is roughly {isTyre ? "35 minutes for a full set of four" : "20 minutes at your door"}.
                Book a slot and we will confirm on WhatsApp within the hour.
              </p>
              <Link
                to="/booking"
                className="inline-block rounded-sm border border-ember px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-ember transition-colors hover:bg-gradient-ember hover:text-primary-foreground"
              >
                Book fitting
              </Link>
            </div>
          ) : null}
        </motion.div>
      </section>

      {related.length ? (
        <section className="border-t border-border bg-surface/20 py-20">
          <div className="container mx-auto px-6">
            <Reveal className="mb-10">
              <p className="text-[10px] uppercase tracking-[0.35em] text-ember">You may also like</p>
              <h2 className="mt-2 text-4xl md:text-5xl">SIMILAR FITMENT</h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}