import { Link } from "react-router-dom";
import PageHeader from "@/components/site/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Motion";



function FranchisePage() {
  useMeta({ title: "Franchise Opportunities — Moon Battery and Tyre", description: "Open a Moon Battery and Tyre branch: investment, support, equipment and territory details for prospective franchise partners." });

  return (
    <>
      <PageHeader eyebrow={"Partner with Moon"} title={"OWN A BAY"} subtitle={"We supply the equipment, the training and the brand. You supply the location and the standards."} />
      <section className="container mx-auto px-6 py-20">
        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[{"tag":"Investment","title":"₹45–70 LAKH","text":"Covers equipment, fit-out, opening stock and the first year of brand licensing."},{"tag":"Space","title":"2,500 SQ FT MINIMUM","text":"Ground floor with vehicle access, four bays and customer parking for six cars."},{"tag":"Support","title":"90 DAY LAUNCH","text":"Site survey, equipment install, staff training and a supervised opening month."},{"tag":"Territory","title":"EXCLUSIVE RADIUS","text":"Protected five kilometre territory with no company-owned branch inside it."},{"tag":"Returns","title":"24–32 MONTH PAYBACK","text":"Typical across our existing partner branches, based on audited numbers."},{"tag":"Standards","title":"NON-NEGOTIABLE","text":"Stock freshness, printed reports and no upsell commission apply to every partner."}].map((item) => (
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

export default FranchisePage;
