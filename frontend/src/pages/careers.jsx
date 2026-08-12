import { Link } from "react-router-dom";
import PageHeader from "@/components/site/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Motion";



function CareersPage() {
  useMeta({ title: "Careers — Moon Battery and Tyre", description: "Open roles for technicians, service advisors and branch managers across six Indian cities. Training and certification provided." });

  return (
    <>
      <PageHeader eyebrow={"We are hiring"} title={"BUILD A CAREER UNDER CARS"} subtitle={"Certified training, tools provided, and a pay structure with no upsell commission — because we do not upsell."} />
      <section className="container mx-auto px-6 py-20">
        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[{"tag":"Mumbai · Full time","title":"SENIOR TYRE TECHNICIAN","text":"Five years on touchless changers and road-force balancers. OEM certification supported."},{"tag":"Pune · Full time","title":"SERVICE ADVISOR","text":"Front-of-house role explaining specs honestly to customers. No commission targets."},{"tag":"Bengaluru · Full time","title":"ALIGNMENT SPECIALIST","text":"3D camera rig experience preferred. We will train the right candidate from scratch."},{"tag":"Gurugram · Full time","title":"BRANCH MANAGER","text":"Run a five-bay branch end to end, from stock rotation to team rostering."},{"tag":"Hyderabad · Full time","title":"MOBILE VAN TECHNICIAN","text":"Doorstep battery fitting and roadside recovery. Clean driving licence essential."},{"tag":"All cities","title":"APPRENTICE PROGRAMME","text":"Eighteen month paid apprenticeship ending in a nationally recognised certification."}].map((item) => (
            <StaggerItem key={item.title}>
              <div className="hover-lift h-full rounded-lg border border-border bg-surface p-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-ember">{item.tag}</p>
                <h2 className="mt-3 text-3xl leading-none">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  );
}

export default CareersPage;
