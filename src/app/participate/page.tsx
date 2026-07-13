import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { ParticipationForm } from "@/components/ParticipationForm";
import { SectionHeading } from "@/components/SectionHeading";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Συμμετοχή",
  description: "Φόρμα συμμετοχής για rappers, producers και visual artists.",
  path: "/participate"
});

export default function ParticipatePage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: "Συμμετοχή" }]} />
      <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
        <div>
          <SectionHeading eyebrow="Open call" title="Δήλωσε συμμετοχή" copy="Για rappers, producers και visual artists που θέλουν να μπουν στη διαδικασία, όχι απλώς να στείλουν ένα έτοιμο κομμάτι." />
          <div className="border border-[var(--line)] bg-[var(--panel)] p-5 text-sm leading-7 text-[var(--muted)]">
            <p>Στείλε στοιχεία, links και λίγα λόγια για το γιατί σε ενδιαφέρει η σειρά. Δεν χρειάζεται ολοκληρωμένο track για τη δήλωση.</p>
            <p className="mt-4 font-bold text-[var(--foreground)]">Οι δηλώσεις πηγαίνουν απευθείας στην ομάδα και αξιολογούνται για επόμενες sessions.</p>
          </div>
        </div>
        <ParticipationForm />
      </div>
    </Container>
  );
}
