import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/site/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import { Reveal } from "@/components/site/Motion";



const field = "w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-ember";
const btn = "w-full rounded-sm bg-gradient-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-ember transition-transform duration-300 hover:scale-[1.02]";

function TyreFinder() {
  useMeta({ title: "Tyre Finder — Find Your Exact Size | Moon Battery and Tyre", description: "Enter your tyre size or vehicle details and we will match the exact fitment from our live stock." });

  const navigate = useNavigate();
  return (
    <>
      <PageHeader eyebrow={"Exact fitment, first time"} title={"FIND YOUR SIZE"} subtitle={"Read the three numbers off your sidewall, or just give us the car. Both work."} />
      <section className="container mx-auto max-w-2xl px-6 py-20">
        <Reveal>
          <form onSubmit={(e) => { e.preventDefault(); navigate("/tyres"); }} className="space-y-5 rounded-lg border border-border bg-surface p-8">
            <div className="grid gap-5 sm:grid-cols-3">
              <input required placeholder="Width (205)" className={field} />
              <input required placeholder="Profile (55)" className={field} />
              <input required placeholder="Rim (R16)" className={field} />
            </div>
            <p className="text-center text-xs uppercase tracking-[0.25em] text-steel">or search by vehicle</p>
            <div className="grid gap-5 sm:grid-cols-2">
              <input placeholder="Make (Honda)" className={field} />
              <input placeholder="Model & year (City 2021)" className={field} />
            </div>
            <button type="submit" className={btn}>Show matching products</button>
            <p className="text-center text-xs text-muted-foreground">Not sure? Call us with your registration number and we'll match it in seconds.</p>
          </form>
        </Reveal>
      </section>
    </>
  );
}

export default TyreFinder;
