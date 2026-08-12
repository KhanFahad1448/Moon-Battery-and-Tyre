import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "@/components/site/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import { Stagger, StaggerItem } from "@/components/site/Motion";
import api from "@/lib/api";

function FaqPage() {
  useMeta({
    title: "FAQ — Moon Battery and Tyre",
    description:
      "Answers on fitting, warranty, payment methods, stock freshness, battery buyback and slot booking at Moon Battery and Tyre.",
  });

  const [open, setOpen] = useState(0);

  const {
    data: faqs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => (await api.get("/faqs")).data,
  });

  return (
    <>
      <PageHeader
        eyebrow="Straight answers"
        title="QUESTIONS, ANSWERED"
        subtitle="If your question is not here, our counter picks up the phone in under three rings."
      />

      {isLoading && (
        <p className="container mx-auto px-6 py-16 text-center text-muted-foreground">
          Loading...
        </p>
      )}
      {isError && (
        <p className="container mx-auto px-6 py-16 text-center text-muted-foreground">
          Couldn't load FAQs right now. Make sure the backend server is running.
        </p>
      )}

      {faqs && (
        <section className="container mx-auto max-w-3xl px-6 py-20">
          <Stagger className="space-y-px overflow-hidden rounded-lg border border-border bg-border">
            {faqs.map((f, i) => (
              <StaggerItem key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full bg-surface p-7 text-left transition-colors hover:bg-surface-2"
                >
                  <span className="flex items-start justify-between gap-6">
                    <span className="text-xl">{f.q}</span>
                    <span
                      className={
                        "shrink-0 text-ember transition-transform duration-300 " +
                        (open === i ? "rotate-45" : "")
                      }
                    >
                      +
                    </span>
                  </span>
                  {open === i ? (
                    <span className="mt-4 block text-sm leading-relaxed text-muted-foreground">
                      {f.a}
                    </span>
                  ) : null}
                </button>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}
    </>
  );
}

export default FaqPage;