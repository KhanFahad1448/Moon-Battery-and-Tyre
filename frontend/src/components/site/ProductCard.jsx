import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { motion } from "motion/react";
import { inr, images } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const isTyre = product.kind === "tyre";
  const saved = wishlist.some((w) => w.id === `${product.kind}:${product.slug}`);
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface"
    >
      <Link
        to={isTyre ? `/tyres/${product.slug}` : `/batteries/${product.slug}`}
        className="relative block aspect-4/3 overflow-hidden bg-background"
      >
        <img
          src={product.images?.[0]?.url || (isTyre ? images.heroTyre : images.heroBattery)}
          alt={`${product.brand} ${product.name}`}
          loading="lazy"
          className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
        />
        <span className="absolute left-2 top-2 rounded-sm bg-gradient-ember px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-primary-foreground sm:left-3 sm:top-3 sm:px-2 sm:py-1 sm:text-[10px]">
          {off}% off
        </span>
      </Link>

      <button
        type="button"
        onClick={() => toggleWishlist(product)}
        aria-label="Save to wishlist"
        className="absolute right-2 top-2 rounded-full border border-border bg-background/70 p-1.5 backdrop-blur transition-colors hover:border-ember hover:text-ember sm:right-3 sm:top-3 sm:p-2"
      >
        <Heart size={13} className={"sm:hidden " + (saved ? "fill-ember text-ember" : "")} />
        <Heart size={15} className={"hidden sm:block " + (saved ? "fill-ember text-ember" : "")} />
      </button>

      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <p className="text-[9px] uppercase tracking-[0.18em] text-ember sm:text-[11px] sm:tracking-[0.22em]">{product.brand}</p>
        <h3 className="mt-1 text-base leading-tight sm:text-2xl sm:leading-none">{product.name}</h3>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
          {isTyre ? product.size : `${product.capacity} · ${product.cca} CCA`}
        </p>

        <div className="mt-2 hidden items-center gap-1.5 text-xs text-muted-foreground sm:mt-3 sm:flex">
          {product.rating ? (
            <>
              <Star size={13} className="fill-ember text-ember" />
              <span className="font-semibold text-foreground">{product.rating}</span>
              <span>({product.reviews || 0})</span>
              <span className="mx-1 text-steel">|</span>
            </>
          ) : null}
          <span>{product.warranty} warranty</span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-3 sm:gap-3 sm:pt-5">
          <div>
            <p className="text-[10px] text-muted-foreground line-through sm:text-xs">{inr(product.mrp)}</p>
            <p className="text-base font-semibold tracking-tight sm:text-2xl">{inr(product.price)}</p>
          </div>
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="rounded-sm border border-ember/50 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-ember transition-all duration-300 hover:bg-gradient-ember hover:text-primary-foreground sm:px-4 sm:py-2 sm:text-xs"
          >
            Add
          </button>
        </div>
      </div>
    </motion.article>
  );
}