import { useQuery } from "@tanstack/react-query";
import PageHeader from "@/components/site/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import Catalogue from "@/components/site/Catalogue";
import api from "@/lib/api";

function BatteriesPage() {
  useMeta({
    title: "Car & Inverter Batteries — Moon Battery and Tyre",
    description:
      "Flooded, AGM, lithium and inverter batteries with up to 72 months warranty, free doorstep fitting and old-battery buyback at live scrap rates.",
  });

  const {
    data: batteries,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", "battery"],
    queryFn: async () => {
      const res = await api.get("/products", { params: { kind: "battery" } });
      return res.data;
    },
  });

  return (
    <>
      <PageHeader
        eyebrow="10 lines in stock"
        title="HONEST POWER"
        subtitle="Car, two-wheeler, truck, marine and inverter cells. Free fitting at your door, and we buy your old battery back at live scrap rates."
      />

      {isLoading && (
        <p className="container mx-auto px-6 py-16 text-center text-muted-foreground">
          Loading batteries...
        </p>
      )}

      {isError && (
        <p className="container mx-auto px-6 py-16 text-center text-muted-foreground">
          Couldn't load batteries right now. Make sure the backend server is running.
        </p>
      )}

      {batteries && (
        <Catalogue
          products={batteries.map((b) => ({ ...b, kind: "battery" }))}
          facetKey="type"
          facetLabel="Application"
        />
      )}
    </>
  );
}

export default BatteriesPage;