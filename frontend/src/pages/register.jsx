import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useMeta } from "@/hooks/useMeta";
import PageHeader from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Motion";
import { useStore } from "@/lib/store";

const field = "w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-ember";
const btn = "w-full rounded-sm bg-gradient-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-ember transition-transform duration-300 hover:scale-[1.02] disabled:opacity-60";

function RegisterPage() {
  useMeta({ title: "Create an Account — Moon Battery and Tyre", description: "Create a Moon Battery and Tyre account to track orders, bookings and warranty claims." });

  const { registerUser } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setLoading(true);
    try {
      await registerUser({
        name: data.get("name"),
        email: data.get("email"),
        phone: data.get("phone"),
        password: data.get("password"),
      });
      toast.success("Welcome to Moon Battery and Tyre");
      navigate("/account");
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't create your account. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader eyebrow={"Two minutes, no spam"} title={"CREATE ACCOUNT"} subtitle={"One account across all six branches, with your full service history attached."} />
      <section className="container mx-auto max-w-md px-6 py-20">
        <Reveal>
          <form onSubmit={submit} className="space-y-5 rounded-lg border border-border bg-surface p-8">
            <input required name="name" placeholder="Full name" className={field} />
            <input required name="phone" type="tel" placeholder="Mobile number" className={field} />
            <input required name="email" type="email" placeholder="Email address" className={field} />
            <input required name="password" type="password" placeholder="Password" minLength={6} className={field} />
            <button type="submit" disabled={loading} className={btn}>{loading ? "Creating account..." : "Create account"}</button>
            <p className="text-center text-sm text-muted-foreground">Already registered? <Link to="/login" className="text-ember">Sign in</Link></p>
          </form>
        </Reveal>
      </section>
    </>
  );
}

export default RegisterPage;