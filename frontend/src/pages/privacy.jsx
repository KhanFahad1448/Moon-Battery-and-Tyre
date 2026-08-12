import { Link } from "react-router-dom";
import PageHeader from "@/components/site/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Motion";



function PrivacyPage() {
  useMeta({ title: "Privacy Policy — Moon Battery and Tyre", description: "How Moon Battery and Tyre collects, stores and uses your personal information, and the rights you have over it." });

  return (
    <>
      <PageHeader eyebrow={"Last updated 6 August 2026"} title={"PRIVACY POLICY"} subtitle={"Plain language, no dark patterns. Here is exactly what we hold and why."} />
      <section className="container mx-auto max-w-3xl px-6 py-20">
        {["We collect only what we need to fulfil an order or a service booking: your name, phone number, email address, vehicle registration and delivery or fitting address.","Payment details are never stored on our servers. When the payment gateway is connected, card and UPI credentials are handled entirely by the payment processor under PCI-DSS rules.","We use your vehicle registration to match correct fitment and to keep a service history so that warranty claims can be verified quickly at the counter.","We do not sell, rent or trade personal information to third parties. We share data only with the courier or technician fulfilling your specific order.","You may request a copy of everything we hold about you, or ask for it to be deleted, by writing to care@moonbatteryandtyre.in. We respond within thirty days.","Cookies on this site are limited to session state such as your cart contents. We do not run third-party advertising trackers."].map((p, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <p className="mb-6 leading-relaxed text-muted-foreground">{p}</p>
          </Reveal>
        ))}
      </section>
    </>
  );
}

export default PrivacyPage;
