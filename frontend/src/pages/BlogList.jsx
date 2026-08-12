import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "@/components/site/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import { Stagger, StaggerItem } from "@/components/site/Motion";
import api from "@/lib/api";

function BlogPage() {
  useMeta({
    title: "Journal — Moon Battery and Tyre",
    description:
      "Guides, safety checklists and honest explainers on tyres, batteries and keeping a car planted on Indian roads.",
  });

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => (await api.get("/posts")).data,
  });

  return (
    <>
      <PageHeader
        eyebrow="The Moon Journal"
        title="KNOW YOUR RUBBER"
        subtitle="No sponsored fluff. Just what twenty-seven years under cars has taught us."
      />

      {isLoading && (
        <p className="container mx-auto px-6 py-16 text-center text-muted-foreground">
          Loading articles...
        </p>
      )}
      {isError && (
        <p className="container mx-auto px-6 py-16 text-center text-muted-foreground">
          Couldn't load the journal right now. Make sure the backend server is running.
        </p>
      )}

      {posts && (
        <section className="container mx-auto px-6 py-20">
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <StaggerItem key={p.slug}>
                <Link
                  to={`/blog/${p.slug}`}
                  className="hover-lift flex h-full flex-col rounded-lg border border-border bg-surface p-8"
                >
                  <p className="text-[10px] uppercase tracking-[0.3em] text-ember">
                    {p.category} · {p.readTime}
                  </p>
                  <h2 className="mt-3 text-3xl leading-none">{p.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                  <p className="mt-auto pt-6 text-xs uppercase tracking-widest text-steel">{p.date}</p>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}
    </>
  );
}

export default BlogPage;