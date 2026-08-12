import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMeta } from "@/hooks/useMeta";
import PageHeader from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Motion";
import api from "@/lib/api";

function PostPage() {
  const { slug } = useParams();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => (await api.get("/posts")).data,
  });

  const post = posts?.find((p) => p.slug === slug);

  useMeta(
    post
      ? { title: `${post.title} — Moon Journal`, description: post.excerpt }
      : { title: "Article not found — Moon Journal" }
  );

  if (isLoading) {
    return (
      <p className="container mx-auto px-6 py-24 text-center text-muted-foreground">
        Loading...
      </p>
    );
  }

  if (!post) {
    return (
      <section className="container mx-auto max-w-md px-6 pb-24 pt-40 text-center">
        <h1 className="text-4xl">Article not found</h1>
        <Link
          to="/blog"
          className="mt-8 inline-block rounded-sm bg-gradient-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-ember"
        >
          Back to journal
        </Link>
      </section>
    );
  }

  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <PageHeader eyebrow={post.category + " · " + post.date + " · " + post.readTime} title={post.title} />
      <article className="container mx-auto max-w-3xl px-6 py-16">
        {post.body.map((para, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">{para}</p>
          </Reveal>
        ))}
      </article>
      <section className="border-t border-border bg-surface/20 py-16">
        <div className="container mx-auto px-6">
          <h2 className="mb-8 text-4xl">KEEP READING</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {more.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="hover-lift rounded-lg border border-border bg-surface p-7">
                <p className="text-[10px] uppercase tracking-[0.3em] text-ember">{p.category}</p>
                <h3 className="mt-2 text-2xl leading-none">{p.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default PostPage;