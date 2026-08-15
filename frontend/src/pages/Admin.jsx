import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  BatteryCharging,
  Calendar,
  LayoutDashboard,
  MessageSquareText,
  Package,
  ShoppingBag,
  Trash2,
  Upload,
} from "lucide-react";
import { useMeta } from "@/hooks/useMeta";
import { useStore } from "@/lib/store";
import { inr } from "@/lib/data";
import api from "@/lib/api";
import PageHeader from "@/components/site/PageHeader";

const field = "w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-ember";
const btn = "rounded-sm bg-gradient-ember px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-ember disabled:opacity-50";

function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const sections = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "bookings", label: "Bookings", icon: Calendar },
  { id: "reviews", label: "Reviews", icon: MessageSquareText },
  { id: "orders", label: "Orders", icon: ShoppingBag },
];

function OverviewSection() {
  const { data: products } = useQuery({ queryKey: ["admin-products"], queryFn: async () => (await api.get("/products")).data });
  const { data: bookings } = useQuery({ queryKey: ["admin-bookings"], queryFn: async () => (await api.get("/admin/bookings")).data });
  const { data: orders } = useQuery({ queryKey: ["admin-orders"], queryFn: async () => (await api.get("/admin/orders")).data });
  const { data: testimonials } = useQuery({ queryKey: ["admin-testimonials"], queryFn: async () => (await api.get("/testimonials")).data });

  const cards = [
    { label: "Products", value: products?.length ?? "—" },
    { label: "Pending bookings", value: bookings?.filter((b) => b.status === "Requested").length ?? "—" },
    { label: "Orders", value: orders?.length ?? "—" },
    { label: "Reviews", value: testimonials?.length ?? "—" },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => (
        <div key={c.label} className="rounded-lg border border-border bg-surface p-6">
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{c.label}</p>
          <p className="mt-2 font-display text-5xl text-gradient-ember">{c.value}</p>
        </div>
      ))}
    </div>
  );
}

function ProductsSection() {
  const qc = useQueryClient();
  const [kind, setKind] = useState("tyre");
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageData, setImageData] = useState(null);

  const { data: products } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => (await api.get("/products")).data,
  });

  const handleImageSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await api.post("/upload", formData);
      setImageData({ url: res.data.url, publicId: res.data.publicId });
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
      setImagePreview(null);
    } finally {
      setUploading(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const brand = data.get("brand");
    const name = data.get("name");
    const spec = data.get("spec");
    try {
      await api.post("/products", {
        kind,
        slug: slugify(`${brand}-${name}-${spec}`),
        name,
        brand,
        price: Number(data.get("price")),
        mrp: Number(data.get("mrp")) || undefined,
        type: data.get("type"),
        warranty: data.get("warranty"),
        stock: Number(data.get("stock")) || 0,
        description: data.get("description"),
        size: kind === "tyre" ? spec : undefined,
        capacity: kind === "battery" ? spec : undefined,
        season: kind === "tyre" ? data.get("season") || undefined : undefined,
        cca: kind === "battery" ? data.get("cca") || undefined : undefined,
        rating: Number(data.get("rating")) || undefined,
        reviews: Number(data.get("reviews")) || undefined,
        images: imageData ? [imageData] : [],
      });
      toast.success("Product added");
      e.currentTarget.reset();
      setImagePreview(null);
      setImageData(null);
      qc.invalidateQueries({ queryKey: ["admin-products"] });
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't add product");
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success("Product deleted");
      qc.invalidateQueries({ queryKey: ["admin-products"] });
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't delete product");
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
      <form onSubmit={submit} className="space-y-4 rounded-lg border border-border bg-surface p-8">
        <h2 className="text-2xl leading-none">Add a product</h2>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setKind("tyre")}
            className={"flex items-center justify-center gap-2 rounded-sm border px-4 py-3 text-xs font-bold uppercase tracking-[0.15em] " + (kind === "tyre" ? "border-ember bg-ember/10 text-ember" : "border-border text-muted-foreground hover:border-ember/50")}
          >
            <Package size={15} /> Tyre
          </button>
          <button
            type="button"
            onClick={() => setKind("battery")}
            className={"flex items-center justify-center gap-2 rounded-sm border px-4 py-3 text-xs font-bold uppercase tracking-[0.15em] " + (kind === "battery" ? "border-ember bg-ember/10 text-ember" : "border-border text-muted-foreground hover:border-ember/50")}
          >
            <BatteryCharging size={15} /> Battery
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input required name="name" placeholder="Name" className={field} />
          <input required name="brand" placeholder="Brand" className={field} />
        </div>
        <input required name="spec" placeholder={kind === "tyre" ? "Size (e.g. 205/55 R16)" : "Capacity (e.g. 65Ah)"} className={field} />
        {kind === "tyre" ? (
          <input name="season" placeholder="Season (e.g. All-season, Summer, Winter)" className={field} />
        ) : (
          <input name="cca" placeholder="CCA (Cold Cranking Amps, e.g. 550)" className={field} />
        )}
        <div className="grid grid-cols-3 gap-4">
          <input required name="price" type="number" placeholder="Price ₹" className={field} />
          <input name="mrp" type="number" placeholder="MRP ₹ (optional)" className={field} />
          <input name="stock" type="number" placeholder="Stock" className={field} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input name="rating" type="number" step="0.1" min="0" max="5" placeholder="Rating (e.g. 4.5, optional)" className={field} />
          <input name="reviews" type="number" min="0" placeholder="Number of reviews (optional)" className={field} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input name="type" placeholder={kind === "tyre" ? "Type (e.g. SUV, Sedan)" : "Type (e.g. Car, Inverter)"} className={field} />
          <input name="warranty" placeholder="Warranty (e.g. 24 months)" className={field} />
        </div>
        <textarea name="description" rows={3} placeholder="Description" className={field} />

        <div>
          <label className="flex cursor-pointer items-center gap-3 rounded-sm border border-dashed border-border px-4 py-3 text-sm text-muted-foreground hover:border-ember">
            <Upload size={16} />
            {uploading ? "Uploading..." : imageData ? "Image uploaded — change" : "Upload product image"}
            <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
          </label>
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-3 h-32 w-32 rounded-sm object-cover" />}
        </div>

        <button type="submit" disabled={uploading} className={btn}>
          Add {kind === "tyre" ? "tyre" : "battery"}
        </button>
      </form>

      <div className="rounded-lg border border-border bg-surface p-8">
        <h2 className="text-2xl leading-none">Catalogue ({products?.length ?? 0})</h2>
        <ul className="mt-6 max-h-[600px] space-y-3 overflow-y-auto">
          {products?.map((p) => (
            <li key={p._id} className="flex items-center justify-between gap-4 border-b border-border pb-3">
              <div className="flex items-center gap-3">
                {p.images?.[0]?.url && <img src={p.images[0].url} alt={p.name} className="h-10 w-10 rounded-sm object-cover" />}
                <div>
                  <p className="text-sm font-semibold">{p.brand} {p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.kind} · {inr(p.price)}</p>
                </div>
              </div>
              <button onClick={() => deleteProduct(p._id)} className="text-muted-foreground hover:text-destructive">
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const bookingStatuses = ["Requested", "Confirmed", "Completed", "Cancelled"];

function BookingsSection() {
  const qc = useQueryClient();
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => (await api.get("/admin/bookings")).data,
  });

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/bookings/${id}/status`, { status });
      toast.success("Booking updated");
      qc.invalidateQueries({ queryKey: ["admin-bookings"] });
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't update booking");
    }
  };

  if (isLoading) return <p className="text-muted-foreground">Loading bookings...</p>;

  return (
    <div className="rounded-lg border border-border bg-surface p-8">
      <h2 className="text-2xl leading-none">Service bookings ({bookings?.length ?? 0})</h2>
      <div className="mt-6 space-y-4">
        {bookings?.map((b) => (
          <div key={b._id} className="rounded-sm border border-border p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold">{b.name} · {b.phone}</p>
                <p className="text-xs text-muted-foreground">
                  {b.vehicle} ({b.regNumber}) · {b.branch}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">{b.date} at {b.time}</p>
            </div>
            {b.notes ? <p className="mt-2 text-xs italic text-muted-foreground">"{b.notes}"</p> : null}
            <div className="mt-3 flex flex-wrap gap-2">
              {bookingStatuses.map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(b._id, s)}
                  className={"rounded-sm px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest " + (b.status === s ? "bg-gradient-ember text-primary-foreground" : "border border-border hover:border-ember")}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ))}
        {bookings?.length === 0 && <p className="text-sm text-muted-foreground">No bookings yet.</p>}
      </div>
    </div>
  );
}

function ReviewsSection() {
  const qc = useQueryClient();
  const { data: testimonials } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: async () => (await api.get("/testimonials")).data,
  });

  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      await api.post("/admin/testimonials", {
        name: data.get("name"),
        city: data.get("city"),
        car: data.get("car"),
        quote: data.get("quote"),
        rating: Number(data.get("rating")) || 5,
      });
      toast.success("Review added");
      e.currentTarget.reset();
      qc.invalidateQueries({ queryKey: ["admin-testimonials"] });
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't add review");
    }
  };

  const remove = async (id) => {
    if (!confirm("Remove this review?")) return;
    try {
      await api.delete(`/admin/testimonials/${id}`);
      toast.success("Review removed");
      qc.invalidateQueries({ queryKey: ["admin-testimonials"] });
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't remove review");
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
      <form onSubmit={submit} className="space-y-4 rounded-lg border border-border bg-surface p-8">
        <h2 className="text-2xl leading-none">Add a review</h2>
        <div className="grid grid-cols-2 gap-4">
          <input required name="name" placeholder="Customer name" className={field} />
          <input name="city" placeholder="City" className={field} />
        </div>
        <input name="car" placeholder="Car (e.g. Hyundai i20)" className={field} />
        <textarea required name="quote" rows={3} placeholder="Review text" className={field} />
        <select name="rating" defaultValue="5" className={field}>
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>{n} stars</option>
          ))}
        </select>
        <button type="submit" className={btn}>Add review</button>
      </form>

      <div className="rounded-lg border border-border bg-surface p-8">
        <h2 className="text-2xl leading-none">Live reviews ({testimonials?.length ?? 0})</h2>
        <p className="mt-1 text-xs text-muted-foreground">These show up on your Testimonials page and home page right now.</p>
        <ul className="mt-6 max-h-[600px] space-y-3 overflow-y-auto">
          {testimonials?.map((t) => (
            <li key={t._id} className="flex items-start justify-between gap-4 border-b border-border pb-3">
              <div>
                <p className="text-sm font-semibold">{t.name} · {t.rating}★</p>
                <p className="text-xs text-muted-foreground">"{t.quote}"</p>
              </div>
              <button onClick={() => remove(t._id)} className="shrink-0 text-muted-foreground hover:text-destructive">
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const orderStatuses = ["Placed", "Confirmed", "Fitted", "Completed", "Cancelled"];

function OrdersSection() {
  const qc = useQueryClient();
  const { data: orders, isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => (await api.get("/admin/orders")).data,
  });

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/orders/${id}/status`, { status });
      toast.success("Order updated");
      qc.invalidateQueries({ queryKey: ["admin-orders"] });
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't update order");
    }
  };

  if (isLoading) return <p className="text-muted-foreground">Loading orders...</p>;

  return (
    <div className="rounded-lg border border-border bg-surface p-8">
      <h2 className="text-2xl leading-none">All orders ({orders?.length ?? 0})</h2>
      <div className="mt-6 space-y-4">
        {orders?.map((o) => (
          <div key={o._id} className="rounded-sm border border-border p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold">{o.orderId}</p>
                <p className="text-xs text-muted-foreground">
                  {o.user?.name} ({o.user?.email}) · {new Date(o.createdAt).toLocaleDateString("en-IN")}
                </p>
              </div>
              <p className="text-ember">{inr(o.total)}</p>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {o.items.length} items · {o.method} · {o.address}, {o.city}, {o.state} {o.pin}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {orderStatuses.map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(o._id, s)}
                  className={"rounded-sm px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest " + (o.status === s ? "bg-gradient-ember text-primary-foreground" : "border border-border hover:border-ember")}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ))}
        {orders?.length === 0 && <p className="text-sm text-muted-foreground">No orders yet.</p>}
      </div>
    </div>
  );
}

function AdminPage() {
  useMeta({ title: "Admin — Moon Battery and Tyre" });
  const { user } = useStore();
  const [section, setSection] = useState("overview");

  if (!user) {
    return (
      <section className="container mx-auto max-w-md px-6 pb-24 pt-40 text-center">
        <h1 className="text-3xl leading-none">Sign in required</h1>
        <Link to="/login" className="mt-6 inline-block rounded-sm bg-gradient-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-ember">Sign in</Link>
      </section>
    );
  }

  if (user.role !== "admin") {
    return (
      <section className="container mx-auto max-w-md px-6 pb-24 pt-40 text-center">
        <h1 className="text-3xl leading-none">Admin access only</h1>
        <p className="mt-3 text-sm text-muted-foreground">Your account doesn't have admin permissions.</p>
        <Link to="/" className="mt-6 inline-block rounded-sm border border-border px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:border-ember hover:text-ember">Back home</Link>
      </section>
    );
  }

  const Active = { overview: OverviewSection, products: ProductsSection, bookings: BookingsSection, reviews: ReviewsSection, orders: OrdersSection }[section];

  return (
    <>
      <PageHeader eyebrow={`Welcome, ${user.name}`} title="ADMIN DASHBOARD" subtitle="Manage your catalogue, bookings, reviews and orders." />
      <section className="container mx-auto px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setSection(s.id)}
                className={
                  "flex shrink-0 items-center gap-3 rounded-sm px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.15em] transition-colors " +
                  (section === s.id ? "bg-gradient-ember text-primary-foreground" : "border border-border text-muted-foreground hover:border-ember hover:text-ember")
                }
              >
                <s.icon size={15} /> {s.label}
              </button>
            ))}
          </nav>
          <div>
            <Active />
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminPage;