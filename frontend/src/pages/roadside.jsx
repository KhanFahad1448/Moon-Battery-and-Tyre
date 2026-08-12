import { Link } from "react-router-dom";
import PageHeader from "@/components/site/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Motion";



function RoadsidePage() {
  useMeta({ title: "24×7 Roadside Assistance — Moon Battery and Tyre", description: "Jump starts, flat tyre changes and towing up to 50 km, round the clock, for ₹1,499 a year." });

  return (
    <>
      <PageHeader eyebrow={"₹1,499 per year"} title={"STRANDED IS NOT A PLAN"} subtitle={"Forty-five minute average response inside city limits, every day of the year, including the ones nobody wants to work."} />
      <section className="container mx-auto px-6 py-20">
        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[{"tag":"Included","title":"UNLIMITED JUMP STARTS","text":"Anywhere inside city limits, as many times as you need it, at no extra cost."},{"tag":"Included","title":"FLAT TYRE CHANGE","text":"We fit your spare on the spot, or tow you in if the spare is gone too."},{"tag":"Included","title":"TOWING TO 50 KM","text":"Flatbed recovery to the nearest Moon branch or a garage of your choosing."},{"tag":"Included","title":"FUEL & LOCKOUT","text":"Ten litres of emergency fuel delivered, plus key lockout assistance."},{"tag":"Response","title":"45 MINUTE AVERAGE","text":"Live tracked vans across all six cities, dispatched from the nearest branch."},{"tag":"Coverage","title":"ANY CAR YOU DRIVE","text":"The membership follows you, not the vehicle. Rentals and friends' cars included."}].map((item) => (
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

export default RoadsidePage;
