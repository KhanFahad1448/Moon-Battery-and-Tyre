import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import PageHeader from "@/components/site/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Motion";
import api from "@/lib/api";

function GalleryPage() {
  useMeta({
    title: "Workshop Gallery — Moon Battery and Tyre",
    description: "A look inside the Moon Battery and Tyre workshops: fitting bays, alignment rigs, stock racks and the team at work.",
  });

  const { data: images, isLoading } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => (await api.get("/gallery")).data,
  });

  const [activeIndex, setActiveIndex] = useState(null);

  const close = () => setActiveIndex(null);
  const showPrev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const showNext = () => setActiveIndex((i) => (i + 1) % images.length);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, images]);

  return (
    <>
      <PageHeader
        eyebrow="Inside the bays"
        title="THE WORKSHOP"
        subtitle="Clean floors, calibrated machines and a stock rack that never holds anything older than six months."
      />
      <section className="container mx-auto px-6 py-20">
        {isLoading && <p className="text-center text-muted-foreground">Loading gallery...</p>}
        {!isLoading && images?.length === 0 && (
          <p className="text-center text-muted-foreground">No images yet.</p>
        )}
        <Stagger className="grid gap-4 md:grid-cols-3">
          {images?.map((img, i) => (
            <StaggerItem key={img._id} className={i % 5 === 0 ? "md:col-span-2" : ""}>
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                className="group block h-72 w-full cursor-zoom-in overflow-hidden rounded-lg border border-border"
              >
                <img
                  src={img.url}
                  alt={img.caption || "Moon Battery and Tyre workshop"}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                />
              </button>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {activeIndex !== null && images && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 rounded-full border border-white/30 p-2 text-white transition-colors hover:border-ember hover:text-ember"
          >
            <X size={20} />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); showPrev(); }}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/30 p-2 text-white transition-colors hover:border-ember hover:text-ember sm:left-8"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); showNext(); }}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/30 p-2 text-white transition-colors hover:border-ember hover:text-ember sm:right-8"
          >
            <ChevronRight size={22} />
          </button>

          <div className="max-h-[85vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[activeIndex].url}
              alt={images[activeIndex].caption || "Moon Battery and Tyre workshop"}
              className="max-h-[85vh] w-full rounded-lg object-contain"
            />
            {images[activeIndex].caption && (
              <p className="mt-3 text-center text-sm text-white/70">{images[activeIndex].caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default GalleryPage;