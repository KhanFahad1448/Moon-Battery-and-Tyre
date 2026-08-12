import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useMeta } from "@/hooks/useMeta";
import PageHeader from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Motion";
import { inr } from "@/lib/data";
import { useStore } from "@/lib/store";



function CartPage() {
  useMeta({ title: "Your Cart — Moon Battery and Tyre", description: "Review your tyres and batteries, fitting charges and GST before checkout." });

  const { cart, setQty, removeFromCart, subtotal, gst, fitting, total } = useStore();
  return (
    <>
      <PageHeader eyebrow="Step 1 of 2" title="YOUR CART" subtitle="Fitting and balancing are already included. GST is added below." />
      <section className="container mx-auto grid gap-10 px-6 py-20 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4">
          {cart.length === 0 ? (
            <div className="rounded-lg border border-border bg-surface p-12 text-center">
              <p className="text-muted-foreground">Your cart is empty.</p>
              <Link to="/tyres" className="mt-6 inline-block rounded-sm bg-gradient-ember px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground">Browse tyres</Link>
            </div>
          ) : cart.map((item) => (
            <Reveal key={item.id}>
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-surface p-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-ember">{item.kind}</p>
                  <h2 className="text-2xl leading-none">{item.name}</h2>
                  <p className="text-sm text-muted-foreground">{item.spec}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center rounded-sm border border-border">
                    <button type="button" onClick={() => setQty(item.id, item.qty - 1)} className="p-3 text-muted-foreground hover:text-ember" aria-label="Decrease"><Minus size={13} /></button>
                    <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                    <button type="button" onClick={() => setQty(item.id, item.qty + 1)} className="p-3 text-muted-foreground hover:text-ember" aria-label="Increase"><Plus size={13} /></button>
                  </div>
                  <p className="w-24 text-right font-semibold">{inr(item.price * item.qty)}</p>
                  <button type="button" onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive" aria-label="Remove"><Trash2 size={16} /></button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="rounded-lg border border-border bg-surface p-8">
            <h2 className="text-3xl">SUMMARY</h2>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{inr(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Fitting & balancing</dt><dd>{fitting === 0 ? "Free" : inr(fitting)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">GST (18%)</dt><dd>{inr(gst)}</dd></div>
            </dl>
            <div className="mt-5 flex items-end justify-between border-t border-border pt-5">
              <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Total</span>
              <span className="font-display text-4xl text-gradient-ember">{inr(total)}</span>
            </div>
            <Link to="/checkout" className="mt-7 block rounded-sm bg-gradient-ember px-6 py-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-ember">Proceed to checkout</Link>
            <p className="mt-4 text-center text-xs text-muted-foreground">UPI · Cards · Net banking · No-cost EMI</p>
          </div>
        </Reveal>
      </section>
    </>
  );
}

export default CartPage;
