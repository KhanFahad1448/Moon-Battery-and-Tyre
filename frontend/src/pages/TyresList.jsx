import { useQuery } from "@tanstack/react-query";
import PageHeader from "@/components/site/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import Catalogue from "@/components/site/Catalogue";
import api from "@/lib/api";

function TyresPage() {
  useMeta({
    title: "Buy Tyres Online — Moon Battery and Tyre",
    description:
      "Touring, performance, all-terrain and EV tyres with free fitting, road-force balancing and lifetime rotation. Live stock and transparent pricing.",
  });

  const {
    data: tyres,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", "tyre"],
    queryFn: async () => {
      const res = await api.get("/products", { params: { kind: "tyre" } });
      return res.data;
    },
  });

  return (
    <>
      <PageHeader
        eyebrow="12 lines in stock"
        title="THE RUBBER RANGE"
        subtitle="From ₹3,190 commuter tyres to motorsport semi-slicks. Every price includes fitting, balancing, nitrogen and lifetime rotation."
      />

      {isLoading && (
        <p className="container mx-auto px-6 py-16 text-center text-muted-foreground">
          Loading tyres...
        </p>
      )}

      {isError && (
        <p className="container mx-auto px-6 py-16 text-center text-muted-foreground">
          Couldn't load tyres right now. Make sure the backend server is running.
        </p>
      )}

      {tyres && (
        <Catalogue
          products={tyres.map((t) => ({ ...t, kind: "tyre" }))}
          facetKey="type"
          facetLabel="Vehicle type"
        />
      )}
    </>
  );
}

export default TyresPage;