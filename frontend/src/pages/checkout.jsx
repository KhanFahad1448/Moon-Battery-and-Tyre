import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMeta } from "@/hooks/useMeta";
import { toast } from "sonner";
import PageHeader from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Motion";
import { inr } from "@/lib/data";
import { useStore } from "@/lib/store";
import api from "@/lib/api";

const field = "w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-ember";
const btn = "w-full rounded-sm bg-gradient-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-ember transition-transform duration-300 hover:scale-[1.02] disabled:opacity-40";
const methods = [
  { id: "upi", label: "UPI", note: "GPay, PhonePe, Paytm, BHIM" },
  { id: "card", label: "Credit / Debit Card", note: "Visa, Mastercard, RuPay, Amex" },
  { id: "netbanking", label: "Net Banking", note: "All major Indian banks" },
  { id: "emi", label: "No-cost EMI", note: "3, 6 or 9 months above ₹10,000" },
  { id: "cod", label: "Pay on Delivery", note: "Cash or card at fitment" },
];

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function CheckoutPage() {
  useMeta({ title: "Checkout — Moon Battery and Tyre", description: "Complete your tyre or battery order. UPI, cards, net banking and no-cost EMI supported." });

  const { user, cart, total, clearCart } = useStore();
  const navigate = useNavigate();
  const [method, setMethod] = useState("upi");
  const [placed, setPlaced] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <>
        <PageHeader eyebrow="Members only" title="SIGN IN TO CHECK OUT" subtitle="Create an account or sign in so we can attach this order to your profile." />
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
    const delivery = {
      name: data.get("name"),
      phone: data.get("phone"),
      email: data.get("email"),
      address: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      pin: data.get("pin"),
    };

    setLoading(true);

    if (method === "cod") {
      try {
        const res = await api.post("/orders", { ...delivery, method });
        clearCart();
        setPlaced(res.data.orderId);
        toast.success("Order placed — our counter will confirm shortly");
      } catch (err) {
        toast.error(err.response?.data?.message || "Couldn't place your order. Try again.");
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error("Couldn't load the payment gateway. Check your connection and try again.");
        setLoading(false);
        return;
      }

      const { data: order } = await api.post("/payments/create-order");

      const razorpay = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.razorpayOrderId,
        name: "Moon Battery and Tyre",
        description: "Order payment",
        prefill: {
          name: delivery.name,
          email: delivery.email,
          contact: delivery.phone,
        },
        theme: { color: "#ff6a1a" },
        handler: async (response) => {
          try {
            const res = await api.post("/payments/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              ...delivery,
            });
            clearCart();
            setPlaced(res.data.orderId);
            toast.success("Payment successful — order confirmed");
          } catch (err) {
            toast.error(err.response?.data?.message || "Payment succeeded but we couldn't confirm your order. Contact us.");
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      });

      razorpay.on("payment.failed", () => {
        toast.error("Payment failed. You haven't been charged — try again.");
        setLoading(false);
      });

      razorpay.open();
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't start payment. Try again.");
      setLoading(false);
    }
  };

  if (placed) {
    return (
      <>
        <PageHeader eyebrow={"Order " + placed} title="ORDER CONFIRMED" subtitle="Our counter will call you within the hour to confirm your fitting slot." />
        <section className="container mx-auto max-w-xl px-6 py-20 text-center">
          <Link to="/account" className="inline-block rounded-sm bg-gradient-ember px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-ember">View my orders</Link>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Step 2 of 2" title="CHECKOUT" subtitle="Secure payment powered by Razorpay — UPI, cards, net banking and EMI, or pay on delivery." />
      <section className="container mx-auto grid gap-10 px-6 py-20 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <form onSubmit={submit} className="space-y-5 rounded-lg border border-border bg-surface p-8">
            <h2 className="text-3xl">DELIVERY & FITTING</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <input required name="name" placeholder="Full name" className={field} />
              <input required name="phone" type="tel" placeholder="Mobile number" className={field} />
            </div>
            <input required name="email" type="email" placeholder="Email address" className={field} />
            <textarea required name="address" rows={3} placeholder="Address" className={field} />
            <div className="grid gap-5 sm:grid-cols-3">
              <input required name="city" placeholder="City" className={field} />
              <input required name="state" placeholder="State" className={field} />
              <input required name="pin" placeholder="PIN code" className={field} />
            </div>

            <h2 className="pt-4 text-3xl">PAYMENT METHOD</h2>
            <div className="space-y-3">
              {methods.map((m) => (
                <label key={m.id} className={"flex cursor-pointer items-center justify-between rounded-sm border px-5 py-4 transition-colors " + (method === m.id ? "border-ember bg-surface-2" : "border-border hover:border-ember/50")}>
                  <span>
                    <span className="block text-sm font-semibold">{m.label}</span>
                    <span className="block text-xs text-muted-foreground">{m.note}</span>
                  </span>
                  <input type="radio" name="method" checked={method === m.id} onChange={() => setMethod(m.id)} className="accent-ember" />
                </label>
              ))}
            </div>
            <button type="submit" disabled={cart.length === 0 || loading} className={btn}>
              {loading ? "Processing..." : `Place order · ${inr(total)}`}
            </button>
          </form>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-lg border border-border bg-surface p-8">
            <h2 className="text-3xl">ORDER</h2>
            <ul className="mt-6 space-y-3 text-sm">
              {cart.map((i) => (
                <li key={i.id} className="flex justify-between gap-4">
                  <span className="text-muted-foreground">{i.name} × {i.qty}</span>
                  <span>{inr(i.price * i.qty)}</span>
                </li>
              ))}
              {cart.length === 0 ? <li className="text-muted-foreground">Your cart is empty.</li> : null}
            </ul>
            <div className="mt-6 flex items-end justify-between border-t border-border pt-5">
              <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Payable</span>
              <span className="font-display text-4xl text-gradient-ember">{inr(total)}</span>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

export default CheckoutPage;