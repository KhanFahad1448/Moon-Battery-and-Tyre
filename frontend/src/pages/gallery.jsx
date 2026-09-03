import { useQuery } from "@tanstack/react-query";
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
              <div className="group h-72 overflow-hidden rounded-lg border border-border">
                <img
                  src={img.url}
                  alt={img.caption || "Moon Battery and Tyre workshop"}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  );
}

export default GalleryPage;