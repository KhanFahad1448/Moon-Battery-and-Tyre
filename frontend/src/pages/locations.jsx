import { useQuery } from "@tanstack/react-query";
import PageHeader from "@/components/site/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import { Stagger, StaggerItem } from "@/components/site/Motion";
import api from "@/lib/api";

function LocationsPage() {
  useMeta({
    title: "Our Locations — Moon Battery and Tyre",
    description:
      "Find a Moon Battery and Tyre branch in Mumbai, Pune, Bengaluru, Gurugram, Hyderabad or Chennai. Addresses, hours and phone numbers.",
  });

  const {
    data: locations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => (await api.get("/locations")).data,
  });

  return (
    <>
      <PageHeader
        eyebrow="Six cities, 35 bays"
        title="FIND YOUR BRANCH"
        subtitle="Every branch runs the same equipment, the same pricing and the same lifetime rotation programme."
      />

      {isLoading && (
        <p className="container mx-auto px-6 py-16 text-center text-muted-foreground">
          Loading branches...
        </p>
      )}
      {isError && (
        <p className="container mx-auto px-6 py-16 text-center text-muted-foreground">
          Couldn't load branches right now. Make sure the backend server is running.
        </p>
      )}

      {locations && (
        <section className="container mx-auto px-6 py-20">
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {locations.map((l) => (
              <StaggerItem key={l.branch}>
                <div className="hover-lift h-full rounded-lg border border-border bg-surface p-8">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-ember">{l.city}</p>
                  <h2 className="mt-2 text-3xl leading-none">{l.branch}</h2>
                  <p className="mt-4 text-sm text-muted-foreground">{l.address}</p>
                  <p className="mt-4 text-sm">{l.hours}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{l.bays} service bays</p>
                  <a
                    href={"tel:" + l.phone.replace(/\s/g, "")}
                    className="mt-5 inline-block text-sm font-semibold text-ember"
                  >
                    {l.phone}
                  </a>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}
    </>
  );
}

export default LocationsPage;