import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ProductCard from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Motion";

export default function Catalogue({ products, facetKey, facetLabel }) {
  const [facet, setFacet] = useState("All");
  const [sort, setSort] = useState("popular");
  const [maxPrice, setMaxPrice] = useState(40000);

  const facets = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p[facetKey])))],
    [products, facetKey],
  );

  const visible = useMemo(() => {
    let list = products.filter((p) => p.price <= maxPrice);
    if (facet !== "All") list = list.filter((p) => p[facetKey] === facet);
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, facet, sort, maxPrice, facetKey]);

  return (
    <section className="container mx-auto px-6 py-16">
      <Reveal className="mb-10 flex flex-col gap-6 rounded-lg border border-border bg-surface p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-ember">
            <SlidersHorizontal size={13} /> {facetLabel}
          </span>
          {facets.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFacet(f)}
              className={`rounded-sm border px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                facet === f
                  ? "border-ember bg-gradient-ember text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-ember hover:text-ember"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
            Budget
            <input
              type="range"
              min="1500"
              max="40000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-ember"
            />
            <span className="text-foreground">₹{maxPrice.toLocaleString("en-IN")}</span>
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-sm border border-border bg-background px-3 py-2 text-xs uppercase tracking-widest text-muted-foreground outline-none focus:border-ember"
          >
            <option value="popular">Most popular</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
      </Reveal>

      <p className="mb-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {visible.length} products
      </p>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.div
              key={`${p.kind}-${p.slug}`}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 ? (
        <p className="py-20 text-center text-muted-foreground">
          Nothing matches those filters. Try widening your budget.
        </p>
      ) : null}
    </section>
  );
}