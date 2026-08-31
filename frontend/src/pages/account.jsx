import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Heart, Package, ShoppingBag } from "lucide-react";
import PageHeader from "@/components/site/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import { Reveal } from "@/components/site/Motion";
import StatusBadge from "@/components/site/StatusBadge";
import { inr } from "@/lib/data";
import { useStore } from "@/lib/store";
import api from "@/lib/api";

function SectionCard({ icon: Icon, title, children }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-8">
      <div className="flex items-center gap-3">
        <span className="rounded-sm border border-ember/30 bg-ember/10 p-2 text-ember">
          <Icon size={18} />
        </span>
        <h2 className="text-2xl leading-none">{title}</h2>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function AccountPage() {
  useMeta({ title: "My Account — Moon Battery and Tyre", description: "Your orders, bookings, saved products and profile at Moon Battery and Tyre." });

  const { user, signOut, wishlist } = useStore();

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => (await api.get("/orders")).data,
    enabled: !!user,
  });

  const { data: bookings, isLoading: bookingsLoading } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: async () => (await api.get("/bookings/mine")).data,
    enabled: !!user,
  });

  if (!user) {
    return (
      <>
        <PageHeader eyebrow="Members only" title="SIGN IN REQUIRED" subtitle="Sign in to see your orders, bookings, saved products and service history." />
        <section className="container mx-auto max-w-md px-6 py-20">
          <Link to="/login" className="block rounded-sm bg-gradient-ember px-6 py-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-ember">Sign in</Link>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader eyebrow={"Signed in as " + user.email} title={"HELLO, " + String(user.name).toUpperCase()} subtitle="Your orders, bookings, saved products and service history live here." />
      <section className="container mx-auto grid gap-8 px-6 py-20 lg:grid-cols-2">
        <div className="space-y-8">
          <Reveal>
            <SectionCard icon={ShoppingBag} title="ORDERS">
              {ordersLoading ? (
                <p className="text-sm text-muted-foreground">Loading orders...</p>
              ) : !orders || orders.length === 0 ? (
                <p className="text-sm text-muted-foreground">No orders yet — your purchases will show up here.</p>
              ) : (
                <ul className="space-y-4">
                  {orders.map((o) => (
                    <li key={o.orderId} className="flex items-center justify-between gap-4 border-b border-border pb-4 last:border-0 last:pb-0">
                      <div>
                        <p className="text-sm font-semibold">{o.orderId}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {new Date(o.createdAt).toLocaleDateString("en-IN")} · {o.items.length} items · {inr(o.total)}
                        </p>
                      </div>
                      <StatusBadge status={o.status} />
                    </li>
                  ))}
                </ul>
              )}
            </SectionCard>
          </Reveal>

          <Reveal delay={0.05}>
            <SectionCard icon={Calendar} title="BOOKINGS">
              {bookingsLoading ? (
                <p className="text-sm text-muted-foreground">Loading bookings...</p>
              ) : !bookings || bookings.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No bookings yet.{" "}
                  <Link to="/booking" className="text-ember hover:underline">
                    Reserve a service bay
                  </Link>
                  .
                </p>
              ) : (
                <ul className="space-y-4">
                  {bookings.map((b) => (
                    <li key={b._id} className="flex items-center justify-between gap-4 border-b border-border pb-4 last:border-0 last:pb-0">
                      <div>
                        <p className="text-sm font-semibold">{b.branch}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {b.date} at {b.time} · {b.vehicle}
                        </p>
                      </div>
                      <StatusBadge status={b.status} />
                    </li>
                  ))}
                </ul>
              )}
            </SectionCard>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <SectionCard icon={Heart} title="SAVED">
            {wishlist.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nothing saved yet — tap the heart on any product to keep it here.</p>
            ) : (
              <ul className="space-y-3">
                {wishlist.map((wl) => (
                  <li key={wl.id}>
                    <Link to={wl.kind === "tyre" ? `/tyres/${wl.slug}` : `/batteries/${wl.slug}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-ember">
                      <Package size={14} className="shrink-0" />
                      {wl.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <button type="button" onClick={signOut} className="mt-8 w-full rounded-sm border border-border px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:border-destructive hover:text-destructive">
              Sign out
            </button>
          </SectionCard>
        </Reveal>
      </section>
    </>
  );
}

export default AccountPage;