import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMeta } from "@/hooks/useMeta";
import ProductDetail from "@/components/site/ProductDetail";
import api from "@/lib/api";

function BatteryDetail() {
  const { slug } = useParams();

  const { data: batteries, isLoading } = useQuery({
    queryKey: ["products", "battery"],
    queryFn: async () => {
      const res = await api.get("/products", { params: { kind: "battery" } });
      return res.data;
    },
  });

  const product = batteries?.find((b) => b.slug === slug);

  useMeta(
    product
      ? {
          title: `${product.brand} ${product.name} ${product.capacity} — Moon Battery and Tyre`,
          description: product.description.slice(0, 155),
        }
      : { title: "Battery not found — Moon Battery and Tyre" }
  );

  if (isLoading) {
    return (
      <p className="container mx-auto px-6 py-24 text-center text-muted-foreground">
        Loading...
      </p>
    );
  }

  if (!product) {
    return (
      <section className="container mx-auto max-w-md px-6 pb-24 pt-40 text-center">
        <h1 className="text-4xl">Battery not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This battery may have been removed or the link is incorrect.
        </p>
        <Link
          to="/batteries"
          className="mt-8 inline-block rounded-sm bg-gradient-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-ember"
        >
          Back to batteries
        </Link>
      </section>
    );
  }

  const related = batteries
    .filter((b) => b.slug !== product.slug && b.type === product.type)
    .slice(0, 4)
    .map((b) => ({ ...b, kind: "battery" }));

  return <ProductDetail product={{ ...product, kind: "battery" }} related={related} />;
}

export default BatteryDetail;