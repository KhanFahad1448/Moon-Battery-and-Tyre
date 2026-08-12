import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "@/components/site/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import { Reveal } from "@/components/site/Motion";
import { inr } from "@/lib/data";
import { useStore } from "@/lib/store";
import api from "@/lib/api";

function AccountPage() {
  useMeta({ title: "My Account — Moon Battery and Tyre", description: "Your orders, saved products and profile at Moon Battery and Tyre." });

  const { user, signOut, wishlist } = useStore();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => (await api.get("/orders")).data,
    enabled: !!user,
  });

  if (!user) {
    return (
      <>
        <PageHeader eyebrow="Members only" title="SIGN IN REQUIRED" subtitle="Sign in to see your orders, saved products and service history." />
        <section className="container mx-auto max-w-md px-6 py-20">
          <Link to="/login" className="block rounded-sm bg-gradient-ember px-6 py-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-ember">Sign in</Link>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader eyebrow={"Signed in as " + user.email} title={"HELLO, " + String(user.name).toUpperCase()} subtitle="Your orders, saved products and service history live here." />
      <section className="container mx-auto grid gap-8 px-6 py-20 lg:grid-cols-2">
        <Reveal>
          <div className="rounded-lg border border-border bg-surface p-8">
            <h2 className="text-3xl">ORDERS</h2>
            {isLoading ? (
              <p className="mt-4 text-sm text-muted-foreground">Loading orders...</p>
            ) : !orders || orders.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">No orders yet.</p>
            ) : (
              <ul className="mt-6 space-y-4">
                {orders.map((o) => (
                  <li key={o.orderId} className="flex items-center justify-between border-b border-border pb-3 text-sm">
                    <span>
                      <span className="block font-semibold">{o.orderId}</span>
                      <span className="text-muted-foreground">
                        {new Date(o.createdAt).toLocaleDateString("en-IN")} · {o.items.length} items · {o.method}
                      </span>
                    </span>
                    <span className="text-ember">{inr(o.total)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-lg border border-border bg-surface p-8">
            <h2 className="text-3xl">SAVED</h2>
            {wishlist.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">Nothing saved yet.</p>
            ) : (
              <ul className="mt-6 space-y-3">
                {wishlist.map((wl) => (
                  <li key={wl.id}>
                    <Link to={wl.kind === "tyre" ? `/tyres/${wl.slug}` : `/batteries/${wl.slug}`} className="text-sm text-muted-foreground hover:text-ember">{wl.name}</Link>
                  </li>
                ))}
              </ul>
            )}
            <button type="button" onClick={signOut} className="mt-8 w-full rounded-sm border border-border px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:border-destructive hover:text-destructive">Sign out</button>
          </div>
        </Reveal>
      </section>
    </>
  );
}

export default AccountPage;