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
        className="relative block aspect-[4/3] overflow-hidden bg-background"
      >
        <img
          src={product.images?.[0]?.url || (isTyre ? images.heroTyre : images.heroBattery)}
          alt={`${product.brand} ${product.name}`}
          loading="lazy"
          className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
        />
        <span className="absolute left-3 top-3 rounded-sm bg-gradient-ember px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
          {off}% off
        </span>
      </Link>

      <button
        type="button"
        onClick={() => toggleWishlist(product)}
        aria-label="Save to wishlist"
        className="absolute right-3 top-3 rounded-full border border-border bg-background/70 p-2 backdrop-blur transition-colors hover:border-ember hover:text-ember"
      >
        <Heart size={15} className={saved ? "fill-ember text-ember" : ""} />
      </button>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] uppercase tracking-[0.22em] text-ember">{product.brand}</p>
        <h3 className="mt-1 text-2xl leading-none">{product.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {isTyre ? product.size : `${product.capacity} · ${product.cca} CCA`}
        </p>

        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
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

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="text-xs text-muted-foreground line-through">{inr(product.mrp)}</p>
            <p className="text-2xl font-semibold tracking-tight">{inr(product.price)}</p>
          </div>
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="rounded-sm border border-ember/50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-ember transition-all duration-300 hover:bg-gradient-ember hover:text-primary-foreground"
          >
            Add
          </button>
        </div>
      </div>
    </motion.article>
  );
}