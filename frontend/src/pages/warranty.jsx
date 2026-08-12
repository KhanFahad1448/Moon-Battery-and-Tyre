import { Link } from "react-router-dom";
import PageHeader from "@/components/site/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Motion";



function WarrantyPage() {
  useMeta({ title: "Warranty & Claims — Moon Battery and Tyre", description: "How tyre and battery warranty works at Moon Battery and Tyre: coverage, exclusions and how to raise a claim at the counter." });

  return (
    <>
      <PageHeader eyebrow={"Cover you can actually use"} title={"WARRANTY, WITHOUT THE RUNAROUND"} subtitle={"Manufacturer cover plus our own workmanship guarantee. Claims are processed at our counter — you never chase a brand office."} />
      <section className="container mx-auto px-6 py-20">
        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[{"tag":"Tyres","title":"UP TO 6 YEARS","text":"Manufacturing defects, sidewall bubbles and tread separation covered from the date on your invoice."},{"tag":"Batteries","title":"UP TO 72 MONTHS","text":"Pro-rata replacement on capacity loss, verified with a printed conductance test."},{"tag":"Workmanship","title":"LIFETIME ON FITMENT","text":"Balancing, torque and valve work guaranteed for as long as you own the tyre."},{"tag":"Not covered","title":"IMPACT & MISUSE","text":"Pothole cuts, kerb damage, under-inflation wear and racing use fall outside cover."},{"tag":"Process","title":"WALK IN, THAT'S IT","text":"Bring the car and the invoice. Assessment takes fifteen minutes at any branch."},{"tag":"Turnaround","title":"48 HOURS MAXIMUM","text":"Approved claims are replaced from local stock within two working days."}].map((item) => (
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

export default WarrantyPage;
