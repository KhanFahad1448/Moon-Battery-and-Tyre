import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/site/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import { Reveal } from "@/components/site/Motion";



const field = "w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-ember";
const btn = "w-full rounded-sm bg-gradient-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-ember transition-transform duration-300 hover:scale-[1.02]";

function BatteryFinder() {
  useMeta({ title: "Battery Finder — Match Your Car | Moon Battery and Tyre", description: "Tell us your vehicle and we will match the right battery capacity, terminal layout and cold cranking amps." });

  const navigate = useNavigate();
  return (
    <>
      <PageHeader eyebrow={"Right capacity, right terminals"} title={"FIND YOUR BATTERY"} subtitle={"Capacity, cold cranking amps and terminal orientation all have to match. We check all three."} />
      <section className="container mx-auto max-w-2xl px-6 py-20">
        <Reveal>
          <form onSubmit={(e) => { e.preventDefault(); navigate("/batteries"); }} className="space-y-5 rounded-lg border border-border bg-surface p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <input required placeholder="Make (Maruti)" className={field} />
              <input required placeholder="Model (Baleno)" className={field} />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <input required placeholder="Year (2022)" className={field} />
              <select required className={field} defaultValue=""><option value="" disabled>Fuel type</option><option>Petrol</option><option>Diesel</option><option>CNG</option><option>Electric</option></select>
            </div>
            <button type="submit" className={btn}>Show matching products</button>
            <p className="text-center text-xs text-muted-foreground">Not sure? Call us with your registration number and we'll match it in seconds.</p>
          </form>
        </Reveal>
      </section>
    </>
  );
}

export default BatteryFinder;
