import { useQuery } from "@tanstack/react-query";
import PageHeader from "@/components/site/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import { Stagger, StaggerItem } from "@/components/site/Motion";
import { Star } from "lucide-react";
import api from "@/lib/api";

function TestimonialsPage() {
  useMeta({
    title: "Customer Reviews — Moon Battery and Tyre",
    description:
      "Read verified reviews from drivers across India who buy their tyres and batteries at Moon Battery and Tyre.",
  });

  const {
    data: testimonials,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => (await api.get("/testimonials")).data,
  });

  return (
    <>
      <PageHeader
        eyebrow="3,400 verified reviews"
        title="DRIVERS TALK"
        subtitle="Every review below comes from a customer with an invoice number. We do not filter the bad ones."
      />

      {isLoading && (
        <p className="container mx-auto px-6 py-16 text-center text-muted-foreground">
          Loading reviews...
        </p>
      )}
      {isError && (
        <p className="container mx-auto px-6 py-16 text-center text-muted-foreground">
          Couldn't load reviews right now. Make sure the backend server is running.
        </p>
      )}

      {testimonials && (
        <section className="container mx-auto px-6 py-20">
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <figure className="hover-lift h-full rounded-lg border border-border bg-surface p-8">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={14} className="fill-ember text-ember" />
                    ))}
                  </div>
                  <blockquote className="mt-5 leading-relaxed">"{t.quote}"</blockquote>
                  <figcaption className="mt-6 text-sm text-muted-foreground">
                    <span className="text-foreground">{t.name}</span> · {t.car} · {t.city}
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}
    </>
  );
}

export default TestimonialsPage;