import { Link } from "react-router-dom";
import PageHeader from "@/components/site/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Motion";



function OffersPage() {
  useMeta({ title: "Offers & No-Cost EMI — Moon Battery and Tyre", description: "Seasonal discounts, set-of-four savings, battery exchange bonuses and no-cost EMI on purchases above ₹10,000." });

  return (
    <>
      <PageHeader eyebrow={"Live this month"} title={"OFFERS THAT ARE ACTUALLY ON"} subtitle={"No inflated MRP theatre. These are the discounts running right now, at every branch."} />
      <section className="container mx-auto px-6 py-20">
        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[{"tag":"Set of four","title":"BUY 3 GET 1 HALF PRICE","text":"On any MoonGrip GT or Monsoon Shield set of four, fitted and balanced free."},{"tag":"Exchange","title":"₹1,200 OFF ON BUYBACK","text":"Trade your old battery at live scrap rates plus a flat ₹1,200 exchange bonus."},{"tag":"Finance","title":"NO-COST EMI","text":"Three, six and nine month no-cost EMI on all major cards above ₹10,000."},{"tag":"EV owners","title":"₹2,000 EV CREDIT","text":"Flat credit on a set of four Voltura EV tyres, plus a free alignment."},{"tag":"Monsoon","title":"FREE TREAD AUDIT","text":"Depth, pressure and alignment check on any car, no purchase required."},{"tag":"Fleet","title":"CORPORATE RATES","text":"Consolidated monthly invoicing and priority stock for fleets above ten vehicles."}].map((item) => (
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

export default OffersPage;
