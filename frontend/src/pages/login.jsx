import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useMeta } from "@/hooks/useMeta";
import PageHeader from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Motion";
import { useStore } from "@/lib/store";

const field = "w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-ember";
const btn = "w-full rounded-sm bg-gradient-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-ember transition-transform duration-300 hover:scale-[1.02] disabled:opacity-60";

function LoginPage() {
  useMeta({ title: "Sign In — Moon Battery and Tyre", description: "Sign in to track orders, warranty claims and service history at Moon Battery and Tyre." });

  const { login } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setLoading(true);
    try {
      await login(data.get("email"), data.get("password"));
      toast.success("Welcome back");
      navigate("/account");
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't sign in. Check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader eyebrow={"Welcome back"} title={"SIGN IN"} subtitle={"Track orders, warranty claims and your full service history."} />
      <section className="container mx-auto max-w-md px-6 py-20">
        <Reveal>
          <form onSubmit={submit} className="space-y-5 rounded-lg border border-border bg-surface p-8">
            <input required name="email" type="email" placeholder="Email address" className={field} />
            <input required name="password" type="password" placeholder="Password" className={field} />
            <button type="submit" disabled={loading} className={btn}>{loading ? "Signing in..." : "Sign in"}</button>
            <p className="text-center text-sm text-muted-foreground">New here? <Link to="/register" className="text-ember">Create an account</Link></p>
          </form>
        </Reveal>
      </section>
    </>
  );
}

export default LoginPage;