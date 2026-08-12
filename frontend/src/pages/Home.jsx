import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BatteryCharging,
  Clock,
  Gauge,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { useMeta } from "@/hooks/useMeta";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Motion";
import ProductCard from "@/components/site/ProductCard";
import api from "@/lib/api";
import {
  brands,
  images,
  posts,
  services,
  stats,
} from "@/lib/data";

// qy6aRmeLqvxILT2Z

const promises = [
  { icon: ShieldCheck, title: "Genuine stock only", text: "Never older than six months. DOT code printed on your invoice." },
  { icon: Clock, title: "35 minute turnaround", text: "Booked cars go straight onto the lift. No queue, no waiting room." },
  { icon: Truck, title: "Doorstep battery fitting", text: "Free at your home or office, anywhere within city limits." },
  { icon: Gauge, title: "Road-force balancing", text: "German machines, balanced to under five grams every time." },
];

const steps = [
  { n: "01", title: "Tell us your car", text: "Registration number or tyre size — we match the exact fitment." },
  { n: "02", title: "Pick your rubber or power", text: "Transparent prices, live stock, no hidden fitting charges." },
  { n: "03", title: "Book a bay", text: "Choose a branch and a fifteen-minute slot that suits you." },
  { n: "04", title: "Drive out sharper", text: "Balanced, aligned, torqued to spec, with a printed report." },
];

function Home() {
  useMeta({
    title: "Moon Battery and Tyre — Premium Tyres & Batteries in India",
    description:
      "Buy premium tyres and car batteries with free fitting, lifetime rotation, 3D alignment and 24x7 roadside assistance across six Indian cities.",
  });

  const { data: tyresData } = useQuery({
    queryKey: ["products", "tyre"],
    queryFn: async () => (await api.get("/products", { params: { kind: "tyre" } })).data,
  });
  const { data: batteriesData } = useQuery({
    queryKey: ["products", "battery"],
    queryFn: async () => (await api.get("/products", { params: { kind: "battery" } })).data,
  });
  const { data: testimonials } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => (await api.get("/testimonials")).data,
   });

  const featured = [
    tyresData?.[0] && { ...tyresData[0], kind: "tyre" },
    batteriesData?.[0] && { ...batteriesData[0], kind: "battery" },
    tyresData?.[5] && { ...tyresData[5], kind: "tyre" },
    batteriesData?.[1] && { ...batteriesData[1], kind: "battery" },
  ].filter(Boolean);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[92vh] overflow-hidden">
        <motion.div style={{ y: imgY }} className="absolute inset-0 -z-10">
          <img
            src={images.heroTyre}
            alt="Premium performance tyre lit by ember orange light"
            width={1600}
            height={1104}
            className="h-[115%] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/70" />
        </motion.div>

        <motion.div
          style={{ y: textY, opacity: fade }}
          className="container mx-auto px-6 pb-24 pt-44 md:pt-52"
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-ember"
          >
            <span className="h-px w-12 bg-gradient-ember" />
            Est. 1999 · Six cities
          </motion.p>

          <h1 className="max-w-4xl text-6xl leading-[0.88] sm:text-7xl md:text-8xl lg:text-9xl">
            {"GRIP THE".split(" ").map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="mr-4 inline-block"
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="block text-gradient-ember"
            >
              ROAD HARDER
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Premium tyres and batteries, fitted by people who actually torque to spec.
            Free fitting, free rotation for life, and a printed report with every car.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.58 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/tyres"
              className="group inline-flex items-center gap-3 rounded-sm bg-gradient-ember px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-ember transition-transform duration-300 hover:scale-[1.04]"
            >
              Shop tyres
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
            <Link
              to="/batteries"
              className="inline-flex items-center gap-3 rounded-sm border border-border px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300 hover:border-ember hover:text-ember"
            >
              <BatteryCharging size={15} /> Shop batteries
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-16 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="border-l border-border pl-4">
                <p className="font-display text-4xl text-gradient-ember">{s.value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Brand marquee */}
      <section className="overflow-hidden border-y border-border bg-surface/40 py-6">
        <div className="flex w-max marquee-track gap-14 whitespace-nowrap">
          {[...brands, ...brands].map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="font-display text-2xl uppercase tracking-[0.2em] text-steel transition-colors duration-300 hover:text-ember"
            >
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto grid gap-6 px-6 py-24 lg:grid-cols-2">
        {[
          {
            to: "/tyres",
            img: images.heroTyre,
            eyebrow: "12 lines in stock",
            title: "TYRES",
            text: "Touring, performance, all-terrain and EV-specific rubber for every Indian road.",
          },
          {
            to: "/batteries",
            img: images.heroBattery,
            eyebrow: "10 lines in stock",
            title: "BATTERIES",
            text: "Flooded, AGM, lithium and inverter cells with up to 72 months of cover.",
          },
        ].map((cat, i) => (
          <Reveal key={cat.to} delay={i * 0.12}>
            <Link
              to={cat.to}
              className="group relative block h-[420px] overflow-hidden rounded-lg border border-border"
            >
              <img
                src={cat.img}
                alt={cat.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="text-[10px] uppercase tracking-[0.35em] text-ember">{cat.eyebrow}</p>
                <h2 className="mt-2 text-6xl leading-none">{cat.title}</h2>
                <p className="mt-3 max-w-sm text-sm text-muted-foreground">{cat.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-ember">
                  Explore
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-2" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>

      {/* Featured */}
      <section className="border-y border-border bg-surface/20 py-24">
        <div className="container mx-auto px-6">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-ember">Best sellers</p>
              <h2 className="mt-2 text-5xl md:text-6xl">MOVING FASTEST</h2>
            </div>
            <Link to="/offers" className="text-xs font-bold uppercase tracking-[0.2em] text-ember ember-underline">
              See all offers
            </Link>
          </Reveal>
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <StaggerItem key={`${p.kind}-${p.slug}`}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Promises */}
      <section className="container mx-auto px-6 py-24">
        <Reveal className="mb-12 max-w-2xl">
          <p className="text-[10px] uppercase tracking-[0.35em] text-ember">Why Moon</p>
          <h2 className="mt-2 text-5xl md:text-6xl">NO SHORTCUTS, EVER</h2>
        </Reveal>
        <Stagger className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((p) => (
            <StaggerItem key={p.title}>
              <div className="group h-full bg-surface p-8 transition-colors duration-500 hover:bg-surface-2">
                <p.icon size={26} className="text-ember transition-transform duration-500 group-hover:scale-110" />
                <h3 className="mt-5 text-2xl leading-none">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden border-y border-border grid-noise py-24">
        <div className="container mx-auto grid gap-14 px-6 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.35em] text-ember">How it works</p>
            <h2 className="mt-2 text-5xl leading-none md:text-6xl">FOUR STEPS FROM CLICK TO KERB</h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              We stripped the guesswork out of buying tyres and batteries in India. No haggling,
              no mystery fitting charge, no "come back tomorrow".
            </p>
            <Link
              to="/booking"
              className="mt-8 inline-flex items-center gap-3 rounded-sm bg-gradient-ember px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-ember"
            >
              Book your slot <ArrowRight size={15} />
            </Link>
          </Reveal>
          <Stagger className="space-y-px overflow-hidden rounded-lg border border-border bg-border">
            {steps.map((s) => (
              <StaggerItem key={s.n}>
                <div className="group flex items-start gap-6 bg-surface p-7 transition-colors duration-500 hover:bg-surface-2">
                  <span className="font-display text-4xl text-steel transition-colors duration-500 group-hover:text-ember">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="text-2xl leading-none">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Services strip */}
      <section className="container mx-auto px-6 py-24">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-ember">Workshop</p>
            <h2 className="mt-2 text-5xl md:text-6xl">MORE THAN A SHOP</h2>
          </div>
          <Link to="/services" className="text-xs font-bold uppercase tracking-[0.2em] text-ember ember-underline">
            All services
          </Link>
        </Reveal>
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 4).map((s) => (
            <StaggerItem key={s.slug}>
              <Link
                to={`/services/${s.slug}`}
                className="hover-lift block h-full rounded-lg border border-border bg-surface p-7"
              >
                <p className="text-[10px] uppercase tracking-[0.28em] text-ember">{s.duration}</p>
                <h3 className="mt-3 text-2xl leading-none">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.summary}</p>
                <p className="mt-5 text-sm font-semibold text-foreground">{s.price}</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-surface/20 py-24">
        <div className="container mx-auto px-6">
          <Reveal className="mb-12">
            <p className="text-[10px] uppercase tracking-[0.35em] text-ember">4.9 average · 3,400 reviews</p>
            <h2 className="mt-2 text-5xl md:text-6xl">DRIVERS TALK</h2>
          </Reveal>
          <Stagger className="grid gap-6 md:grid-cols-3">
            {testimonials?.slice(0, 3).map((t) => (
              <StaggerItem key={t.name}>
                <figure className="hover-lift h-full rounded-lg border border-border bg-surface p-8">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={14} className="fill-ember text-ember" />
                    ))}
                  </div>
                  <blockquote className="mt-5 text-lg leading-relaxed">"{t.quote}"</blockquote>
                  <figcaption className="mt-6 text-sm text-muted-foreground">
                    <span className="text-foreground">{t.name}</span> · {t.car} · {t.city}
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Journal */}
      <section className="container mx-auto px-6 py-24">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-ember">Journal</p>
            <h2 className="mt-2 text-5xl md:text-6xl">KNOW YOUR RUBBER</h2>
          </div>
          <Link to="/blog" className="text-xs font-bold uppercase tracking-[0.2em] text-ember ember-underline">
            Read all
          </Link>
        </Reveal>
        <Stagger className="grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <StaggerItem key={p.slug}>
              <Link
                to={`/blog/${p.slug}`}
                className="hover-lift group block h-full rounded-lg border border-border bg-surface p-8"
              >
                <p className="text-[10px] uppercase tracking-[0.28em] text-ember">
                  {p.category} · {p.readTime}
                </p>
                <h3 className="mt-3 text-3xl leading-none">{p.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-border">
        <img
          src={images.workshop}
          alt="Moon Battery and Tyre workshop at night"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="container relative mx-auto px-6 py-28">
          <Reveal>
            <h2 className="max-w-3xl text-5xl leading-[0.95] md:text-7xl">
              YOUR NEXT SET IS <span className="text-gradient-ember">READY TO ROLL</span>
            </h2>
            <p className="mt-6 max-w-lg text-muted-foreground">
              Reserve a bay in under a minute. We'll confirm on WhatsApp and have the stock
              waiting on the rack when you arrive.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/booking"
                className="rounded-sm bg-gradient-ember px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-ember"
              >
                Book a slot
              </Link>
              <Link
                to="/contact"
                className="rounded-sm border border-border px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:border-ember hover:text-ember"
              >
                Talk to us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default Home;