import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMeta } from "@/hooks/useMeta";
import ProductDetail from "@/components/site/ProductDetail";
import api from "@/lib/api";

function TyreDetail() {
  const { slug } = useParams();

  const { data: tyres, isLoading } = useQuery({
    queryKey: ["products", "tyre"],
    queryFn: async () => {
      const res = await api.get("/products", { params: { kind: "tyre" } });
      return res.data;
    },
  });

  const product = tyres?.find((t) => t.slug === slug);

  useMeta(
    product
      ? {
          title: `${product.brand} ${product.name} ${product.size} — Moon Battery and Tyre`,
          description: product.description.slice(0, 155),
        }
      : { title: "Tyre not found — Moon Battery and Tyre" }
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
        <h1 className="text-4xl">Tyre not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This tyre may have been removed or the link is incorrect.
        </p>
        <Link
          to="/tyres"
          className="mt-8 inline-block rounded-sm bg-gradient-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-ember"
        >
          Back to tyres
        </Link>
      </section>
    );
  }

  const related = tyres
    .filter((t) => t.slug !== product.slug && t.type === product.type)
    .slice(0, 4)
    .map((t) => ({ ...t, kind: "tyre" }));

  return <ProductDetail product={{ ...product, kind: "tyre" }} related={related} />;
}

export default TyreDetail;