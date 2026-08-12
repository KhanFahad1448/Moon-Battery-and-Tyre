import { Mail, MapPin, Phone } from "lucide-react";
import { useMeta } from "@/hooks/useMeta";
import { toast } from "sonner";
import PageHeader from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Motion";



const field = "w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-ember";
const btn = "w-full rounded-sm bg-gradient-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-ember transition-transform duration-300 hover:scale-[1.02]";

function ContactPage() {
  useMeta({ title: "Contact Moon Battery and Tyre", description: "Call, email or message the Moon Battery and Tyre team. Counter phones answered in under three rings, seven days a week." });

  return (
    <>
      <PageHeader eyebrow="Seven days a week" title="TALK TO US" subtitle="Our counter picks up in under three rings. No call trees, no hold music." />
      <section className="container mx-auto grid gap-12 px-6 py-20 lg:grid-cols-[1fr_1.3fr]">
        <Reveal className="space-y-6">
          {[{ Icon: Phone, label: "Phone", value: "+91 98200 41001" }, { Icon: Mail, label: "Email", value: "care@moonbatteryandtyre.in" }, { Icon: MapPin, label: "Head office", value: "Plot 42, MIDC Road No. 7, Andheri East, Mumbai 400093" }].map((c) => (
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
          <form onSubmit={(e) => { e.preventDefault(); e.currentTarget.reset(); toast.success("Message sent — we'll reply within a day"); }} className="space-y-5 rounded-lg border border-border bg-surface p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <input required placeholder="Your name" className={field} />
              <input required type="tel" placeholder="Mobile number" className={field} />
            </div>
            <input required type="email" placeholder="Email address" className={field} />
            <input placeholder="Subject" className={field} />
            <textarea required rows={6} placeholder="How can we help?" className={field} />
            <button type="submit" className={btn}>Send message</button>
          </form>
        </Reveal>
      </section>
    </>
  );
}

export default ContactPage;
