import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "@/components/site/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import { Stagger, StaggerItem } from "@/components/site/Motion";
import api from "@/lib/api";

function ServicesPage() {
  useMeta({
    title: "Workshop Services — Moon Battery and Tyre",
    description:
      "Fitting, 3D wheel alignment, doorstep battery replacement, puncture repair, nitrogen inflation and 24x7 roadside assistance.",
  });

  const {
    data: services,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => (await api.get("/services")).data,
  });

  return (
    <>
      <PageHeader
        eyebrow="Eight workshop services"
        title="THE BAY IS OPEN"
        subtitle="Everything that keeps a car planted on the road, priced openly and done in one visit."
      />

      {isLoading && (
        <p className="container mx-auto px-6 py-16 text-center text-muted-foreground">
          Loading services...
        </p>
      )}
      {isError && (
        <p className="container mx-auto px-6 py-16 text-center text-muted-foreground">
          Couldn't load services right now. Make sure the backend server is running.
        </p>
      )}

      {services && (
        <section className="container mx-auto px-6 py-20">
          <Stagger className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
            {services.map((s) => (
              <StaggerItem key={s.slug}>
                <Link
                  to={`/services/${s.slug}`}
                  className="group block h-full bg-surface p-9 transition-colors duration-500 hover:bg-surface-2"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-3xl leading-none group-hover:text-ember">{s.title}</h2>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {s.duration}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{s.summary}</p>
                  <p className="mt-6 font-semibold text-ember">{s.price}</p>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}
    </>
  );
}

export default ServicesPage;