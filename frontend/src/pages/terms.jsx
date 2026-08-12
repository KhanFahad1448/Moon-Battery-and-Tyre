import { Link } from "react-router-dom";
import PageHeader from "@/components/site/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Motion";



function TermsPage() {
  useMeta({ title: "Terms of Service — Moon Battery and Tyre", description: "The terms governing purchases, bookings, fitment, returns and warranty claims at Moon Battery and Tyre." });

  return (
    <>
      <PageHeader eyebrow={"Last updated 6 August 2026"} title={"TERMS OF SERVICE"} subtitle={"The rules of the road for buying and booking with us."} />
      <section className="container mx-auto max-w-3xl px-6 py-20">
        {["Placing an order on this site constitutes an offer to purchase. The order is confirmed only when our team acknowledges it by phone, WhatsApp or email.","Prices displayed include fitting where stated and exclude GST, which is added at checkout at the prevailing statutory rate.","Unfitted products in original packaging may be returned within seven days for a full refund. Once a tyre has been mounted or a battery connected, it can only be returned under warranty.","Booking slots are held for thirty minutes past the appointed time. Repeated no-shows may result in a requirement to prepay for future bookings.","Warranty claims are governed by the manufacturer's published terms plus our own workmanship guarantee, and require the original invoice.","We reserve the right to refuse a fitment we consider unsafe, including tyres below the manufacturer's load rating or a size not approved for your vehicle.","These terms are governed by Indian law, and any dispute falls under the exclusive jurisdiction of the courts of Mumbai, Maharashtra."].map((p, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <p className="mb-6 leading-relaxed text-muted-foreground">{p}</p>
          </Reveal>
        ))}
      </section>
    </>
  );
}

export default TermsPage;
