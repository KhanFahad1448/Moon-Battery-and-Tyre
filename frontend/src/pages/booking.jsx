import { useState } from "react";
import { Link } from "react-router-dom";
import { useMeta } from "@/hooks/useMeta";
import { toast } from "sonner";
import PageHeader from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Motion";
import { locations, services } from "@/lib/data";
import { useStore } from "@/lib/store";
import api from "@/lib/api";

const field = "w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-ember";
const btn = "w-full rounded-sm bg-gradient-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-ember transition-transform duration-300 hover:scale-[1.02] disabled:opacity-50";

function BookingPage() {
  useMeta({ title: "Book a Service Slot — Moon Battery and Tyre", description: "Reserve a fitting, alignment or battery bay at any Moon Battery and Tyre branch. Average turnaround 35 minutes." });

  const { user } = useStore();
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <>
        <PageHeader eyebrow="Members only" title="SIGN IN TO BOOK A SLOT" subtitle="Create an account or sign in so we can attach this booking to your profile and keep you updated." />
        <section className="container mx-auto max-w-md px-6 py-20 flex flex-col gap-3">
          <Link to="/login" className="block rounded-sm bg-gradient-ember px-6 py-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-ember">Sign in</Link>
          <Link to="/register" className="block rounded-sm border border-border px-6 py-4 text-center text-xs font-bold uppercase tracking-[0.2em] hover:border-ember hover:text-ember">Create an account</Link>
        </section>
      </>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;
    const data = new FormData(e.currentTarget);
    setLoading(true);
    try {
      await api.post("/bookings", {
        name: data.get("name"),
        phone: data.get("phone"),
        vehicle: data.get("vehicle"),
        regNumber: data.get("regNumber"),
        service: data.get("service"),
        branch: data.get("branch"),
        date: data.get("date"),
        time: data.get("time"),
        notes: data.get("notes"),
      });
      setDone(true);
      toast.success("Slot requested — we'll confirm shortly");
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't request a slot. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader eyebrow="35 minute average turnaround" title="RESERVE A BAY" subtitle="Booked cars go straight onto the lift. Track your booking status anytime from your account." />
      <section className="container mx-auto max-w-2xl px-6 py-20">
        {done ? (
          <Reveal>
            <div className="rounded-lg border border-ember/40 bg-surface p-10 text-center">
              <h2 className="text-4xl leading-none text-gradient-ember">SLOT REQUESTED</h2>
              <p className="mt-4 text-muted-foreground">Our counter will confirm your booking shortly. Track its status from your account anytime.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/account" className="rounded-sm bg-gradient-ember px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-ember">View my bookings</Link>
                <button type="button" onClick={() => setDone(false)} className="rounded-sm border border-border px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:border-ember hover:text-ember">Book another</button>
              </div>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <form onSubmit={submit} className="space-y-5 rounded-lg border border-border bg-surface p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <input required name="name" placeholder="Full name" defaultValue={user.name} className={field} />
                <input required name="phone" type="tel" placeholder="Mobile number" defaultValue={user.phone || ""} className={field} />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <input required name="vehicle" placeholder="Vehicle (e.g. Honda City 2021)" className={field} />
                <input required name="regNumber" placeholder="Registration number" className={field} />
              </div>
              <select required name="service" className={field} defaultValue="">
                <option value="" disabled>Select a service</option>
                {services.map((s) => (<option key={s.slug} value={s.slug}>{s.title} — {s.price}</option>))}
              </select>
              <select required name="branch" className={field} defaultValue="">
                <option value="" disabled>Select a branch</option>
                {locations.map((l) => (<option key={l.branch} value={l.branch}>{l.city} — {l.branch}</option>))}
              </select>
              <div className="grid gap-5 sm:grid-cols-2">
                <input required name="date" type="date" className={field} />
                <input required name="time" type="time" className={field} />
              </div>
              <textarea name="notes" rows={3} placeholder="Anything we should know?" className={field} />
              <button type="submit" disabled={loading} className={btn}>{loading ? "Requesting..." : "Request slot"}</button>
            </form>
          </Reveal>
        )}
      </section>
    </>
  );
}

export default BookingPage;