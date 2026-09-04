import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useMeta } from "@/hooks/useMeta";
import { toast } from "sonner";
import PageHeader from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Motion";
import api from "@/lib/api";

const field = "w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-ember";
const btn = "w-full rounded-sm bg-gradient-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-ember transition-transform duration-300 hover:scale-[1.02] disabled:opacity-50";

function ContactPage() {
  useMeta({ title: "Contact Moon Battery and Tyre", description: "Call, email or message the Moon Battery and Tyre team. Counter phones answered in under three rings, seven days a week." });
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
  e.preventDefault();
  if (submitting) return;
  const form = e.currentTarget;
  const data = new FormData(form);
  setSubmitting(true);
  try {
    await api.post("/contact", {
      name: data.get("name"),
      phone: data.get("phone"),
      email: data.get("email"),
      subject: data.get("subject"),
      message: data.get("message"),
    });
    form.reset();
    toast.success("Message sent — we'll reply within a day");
  } catch (err) {
    toast.error(err.response?.data?.message || "Couldn't send message, please try again");
  } finally {
    setSubmitting(false);
  }
};

  return (
    <>
      <PageHeader eyebrow="Seven days a week" title="TALK TO US" subtitle="Our counter picks up in under three rings. No call trees, no hold music." />
      <section className="container mx-auto grid gap-12 px-6 py-20 lg:grid-cols-[1fr_1.3fr]">
        <Reveal className="space-y-6">
          {[{ Icon: Phone, label: "Phone", value: "+91 89695 53746" }, { Icon: Mail, label: "Email", value: "care@moonbatteryandtyre.in" }, { Icon: MapPin, label: "Head office", value: "Bariatu Rd, opp. Golden battery, Bariatu, Ranchi, Jharkhand 834009" }].map((c) => (
            <div key={c.label} className="flex items-start gap-4 rounded-lg border border-border bg-surface p-6">
              <c.Icon size={18} className="mt-1 text-ember" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{c.label}</p>
                <p className="mt-1">{c.value}</p>
              </div>
            </div>
          ))}
        </Reveal>
        <Reveal delay={0.1}>
          <form onSubmit={submit} className="space-y-5 rounded-lg border border-border bg-surface p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <input required name="name" placeholder="Your name" className={field} />
              <input required name="phone" type="tel" placeholder="Mobile number" className={field} />
            </div>
            <input required name="email" type="email" placeholder="Email address" className={field} />
            <input name="subject" placeholder="Subject" className={field} />
            <textarea required name="message" rows={6} placeholder="How can we help?" className={field} />
            <button type="submit" disabled={submitting} className={btn}>
              {submitting ? "Sending..." : "Send message"}
            </button>
          </form>
        </Reveal>
      </section>
    </>
  );
}

export default ContactPage;