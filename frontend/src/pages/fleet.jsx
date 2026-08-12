import { Link } from "react-router-dom";
import PageHeader from "@/components/site/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Motion";



function FleetPage() {
  useMeta({ title: "Fleet Programme — Moon Battery and Tyre", description: "Consolidated invoicing, on-site service vans, priority stock holding and cost-per-kilometre reporting for commercial fleets." });

  return (
    <>
      <PageHeader eyebrow={"Ten vehicles and up"} title={"KEEP THE FLEET ROLLING"} subtitle={"Downtime is the only number that matters. We build the programme around minimising it."} />
      <section className="container mx-auto px-6 py-20">
        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[{"tag":"Billing","title":"ONE MONTHLY INVOICE","text":"Every branch, every vehicle, consolidated into a single GST invoice."},{"tag":"On-site","title":"SERVICE VANS TO YOU","text":"Scheduled tyre and battery work performed in your yard, overnight if needed."},{"tag":"Stock","title":"PRIORITY HOLDING","text":"We ring-fence your sizes so a replacement is never more than a phone call away."},{"tag":"Reporting","title":"COST PER KILOMETRE","text":"Monthly dashboards on tread life, retread yield and battery failure rates."},{"tag":"Retreads","title":"CASING MANAGEMENT","text":"We track and retread your casings twice, cutting rubber spend substantially."},{"tag":"Account","title":"NAMED MANAGER","text":"One person, one number, who knows your vehicles and answers the phone."}].map((item) => (
            <StaggerItem key={item.title}>
              <div className="hover-lift h-full rounded-lg border border-border bg-surface p-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-ember">{item.tag}</p>
                <h2 className="mt-3 text-3xl leading-none">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  );
}

export default FleetPage;
