import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { useMeta } from "@/hooks/useMeta";
import PageHeader from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Motion";
import api from "@/lib/api";

function ServiceDetail() {
  const { slug } = useParams();

  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => (await api.get("/services")).data,
  });

  const service = services?.find((s) => s.slug === slug);

  useMeta(
    service
      ? { title: `${service.title} — Moon Battery and Tyre`, description: service.summary }
      : { title: "Service not found — Moon Battery and Tyre" }
  );

  if (isLoading) {
    return (
      <p className="container mx-auto px-6 py-24 text-center text-muted-foreground">
        Loading...
      </p>
    );
  }

  if (!service) {
    return (
      <section className="container mx-auto max-w-md px-6 pb-24 pt-40 text-center">
        <h1 className="text-4xl">Service not found</h1>
        <Link
          to="/services"
          className="mt-8 inline-block rounded-sm bg-gradient-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-ember"
        >
          All services
        </Link>
      </section>
    );
  }

  return (
    <>
      <PageHeader eyebrow={service.price + " · " + service.duration} title={service.title.toUpperCase()} subtitle={service.summary} />
      <section className="container mx-auto grid gap-12 px-6 py-20 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-4xl">WHAT'S INCLUDED</h2>
          <ul className="mt-6 space-y-4">
            {service.details.map((d) => (
              <li key={d} className="flex items-start gap-3 text-muted-foreground">
                <Check size={16} className="mt-1 shrink-0 text-ember" /> {d}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-lg border border-border bg-surface p-9">
            <p className="text-[10px] uppercase tracking-[0.3em] text-ember">Book this service</p>
            <p className="mt-3 font-display text-5xl text-gradient-ember">{service.price}</p>
            <p className="mt-2 text-sm text-muted-foreground">Typical bay time: {service.duration}</p>
            <Link to="/booking" className="mt-8 block rounded-sm bg-gradient-ember px-6 py-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-ember">Reserve a slot</Link>
            <Link to="/services" className="mt-3 block rounded-sm border border-border px-6 py-4 text-center text-xs font-bold uppercase tracking-[0.2em] hover:border-ember hover:text-ember">All services</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

export default ServiceDetail;