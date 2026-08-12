import { Link } from "react-router-dom";
import PageHeader from "@/components/site/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Motion";
import { brands } from "@/lib/data";


function BrandsPage() {
  useMeta({ title: "Brands We Stock — Moon Battery and Tyre", description: "Moon Performance, Lunar Offroad, Moon Power, Moon Electric and more — the tyre and battery brands stocked at every branch." });

  return (
    <>
      <PageHeader eyebrow={"Eight house and partner brands"} title={"THE BRAND WALL"} subtitle={"Every brand we carry is one we fit on our own cars. Nothing on this wall is here because of a margin deal."} />
      <section className="container mx-auto px-6 py-20">
        <Stagger className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {brands.map((b) => (
            <StaggerItem key={b}>
              <div className="group flex h-44 items-center justify-center bg-surface p-6 transition-colors duration-500 hover:bg-surface-2">
                <span className="font-display text-2xl uppercase tracking-[0.15em] text-steel transition-colors duration-500 group-hover:text-ember">{b}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  );
}

export default BrandsPage;
