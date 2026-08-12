import { Link } from "react-router-dom";
import PageHeader from "@/components/site/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Motion";



function AboutPage() {
  useMeta({ title: "About Moon Battery and Tyre — 27 Years on the Road", description: "From a single Andheri bay in 1999 to six cities and 1.2 lakh wheels fitted. Meet the team behind Moon Battery and Tyre." });

  return (
    <>
      <PageHeader eyebrow={"Since 1999"} title={"TWENTY-SEVEN YEARS UNDER CARS"} subtitle={"We started with one lift, one compressor and a refusal to sell anybody a tyre they did not need. That has not changed."} />
      <section className="container mx-auto max-w-3xl px-6 py-20">
        {["Moon Battery and Tyre opened in Andheri East in 1999 with a single bay and a hand-cranked bead breaker. The founder, a former rally mechanic, had one rule pinned to the wall: never fit a tyre you would not put on your own family's car.","That rule scaled. Today we run 35 bays across six cities, fit over 1.2 lakh wheels a year, and still print the manufacturing date code on every single invoice so customers can check the freshness of what they bought.","We invested early in equipment nobody else in the neighbourhood had — touchless tyre changers that never touch an alloy rim, road-force balancers accurate to five grams, and camera-based 3D alignment rigs that hand you a printed before-and-after report.","We also refused things. No commission on upselling. No mystery fitting charge added at the counter. No stock older than six months, ever, even when it costs us margin to send it back.","The result is a workshop that behaves like a showroom: transparent, clean, quick, and staffed by technicians who can tell you exactly why your inner shoulder is wearing faster than your outer one."].map((p, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <p className="mb-6 leading-relaxed text-muted-foreground">{p}</p>
          </Reveal>
        ))}
      </section>
      <section className="border-y border-border bg-surface/20 py-20">
        <div className="container mx-auto grid gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4">
          {[{v:"1.2L+",l:"Wheels fitted yearly"},{v:"35",l:"Service bays"},{v:"6",l:"Cities"},{v:"4.9",l:"Average rating"}].map((s) => (
            <Reveal key={s.l}>
              <p className="font-display text-6xl text-gradient-ember">{s.v}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

export default AboutPage;
