import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import PageHeader from "@/components/site/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Motion";
import { Star } from "lucide-react";
import api from "@/lib/api";
import { useStore } from "@/lib/store";
import { Link } from "react-router-dom";

const field = "w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-ember";
const btn = "rounded-sm bg-gradient-ember px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-ember disabled:opacity-50";

function ReviewForm() {
  const { user } = useStore();
  const qc = useQueryClient();
  const [submitting, setSubmitting] = useState(false);

  if (!user) {
    return (
      <div className="rounded-lg border border-border bg-surface p-8 text-center">
        <p className="text-sm text-muted-foreground">Sign in to leave your own review.</p>
        <Link to="/login" className="mt-4 inline-block rounded-sm bg-gradient-ember px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-ember">
          Sign in
        </Link>
      </div>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    try {
      await api.post("/testimonials", {
        car: data.get("car"),
        city: data.get("city"),
        quote: data.get("quote"),
        rating: Number(data.get("rating")) || 5,
      });
      form.reset();
      toast.success("Thanks! Your review will appear once approved.");
      qc.invalidateQueries({ queryKey: ["testimonials"] });
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't submit review, please try again");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4 rounded-lg border border-border bg-surface p-8">
      <h2 className="text-2xl leading-none">Leave a review</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="car" placeholder="Your car (e.g. Hyundai i20)" className={field} />
        <input name="city" placeholder="City" className={field} />
      </div>
      <textarea required name="quote" rows={4} placeholder="Tell us about your experience" className={field} />
      <select name="rating" defaultValue="5" className={field}>
        {[5, 4, 3, 2, 1].map((n) => (
          <option key={n} value={n}>{n} stars</option>
        ))}
      </select>
      <button type="submit" disabled={submitting} className={btn}>
        {submitting ? "Submitting..." : "Submit review"}
      </button>
    </form>
  );
}

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

      <section className="container mx-auto px-6 py-16">
        <Reveal className="mx-auto max-w-xl">
          <ReviewForm />
        </Reveal>
      </section>

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
        <section className="container mx-auto px-6 pb-20">
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <StaggerItem key={t._id || t.name}>
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