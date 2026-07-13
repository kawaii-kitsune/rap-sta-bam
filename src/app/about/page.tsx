import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { releaseCadence, releaseSchedule } from "@/config/site";
import { team } from "@/content/team";
import { isValidHttpUrl } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Σχετικά",
  description: "Η φιλοσοφία, η διαδικασία και η ομάδα πίσω από το Ραπ Στα Μπαμ.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: "Σχετικά" }]} />
      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <SectionHeading eyebrow="About" title="Με ό,τι έχουμε, όπως μπορούμε" />
          <div className="prose-rsb max-w-3xl text-lg leading-8 text-[var(--muted)]">
            <p>Το Ραπ Στα Μπαμ είναι μία ανεξάρτητη DIY μουσική σειρά με βάση το Ηράκλειο Κρήτης.</p>
            <p>Σε κάθε επεισόδιο, καλούμε έναν rapper να μας αφηγηθεί την ιστορία του και να μπει στη session χωρίς έτοιμο κομμάτι. Φτιάχνουμε ένα beat, γράφεται ένα κουπλέ, γίνεται η ηχογράφηση και η κάμερα κρατάει όλη τη διαδρομή.</p>
            <p>Δεν κρύβουμε τη διαδικασία πίσω από το τελικό αποτέλεσμα. Μας ενδιαφέρουν οι ιδέες, οι γνώμες μέσα στο δωμάτιο, τα λάθη, τα αστεία, οι δοκιμές και η στιγμή που κάτι αρχίζει να ακούγεται σαν κομμάτι.</p>
            <p>Η λογική είναι do it yourselves: με ό,τι υπάρχει εκείνη τη στιγμή, όπως μπορούμε, μέχρι το πρώτο sample να γίνει take.</p>
          </div>

          <section className="mt-12">
            <SectionHeading title="Φιλοσοφία" />
            <p className="max-w-3xl text-lg leading-8 text-[var(--muted)]">Η σειρά πατάει σε DIY λογική: φτιάχνουμε μουσική με ό,τι υπάρχει εκείνη τη στιγμή και αφήνουμε να φανεί η συνεργασία μέσα στο δωμάτιο. Παράλληλα, κάθε καλεσμένος φέρνει την ιστορία του: από πού ξεκίνησε, τι τον διαμόρφωσε και γιατί συνεχίζει. Οι γρήγορες επιλογές, τα λάθος takes, η ένταση του χρόνου και οι γνώμες της παρέας είναι μέρος του τελικού έργου.</p>
          </section>

          <section className="mt-12">
            <SectionHeading title="Πρόγραμμα" copy={releaseCadence} />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {releaseSchedule.map((item) => (
                <time key={item.date} dateTime={item.date} className="border border-[var(--line)] bg-[var(--panel)] p-4">
                  <span className="display-font block text-4xl text-[var(--accent)]">{item.label}</span>
                  <span className="text-sm font-bold text-[var(--muted)]">{item.title}</span>
                </time>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <SectionHeading title="Παραγωγική διαδικασία" />
            <div className="grid gap-3 sm:grid-cols-2">
              {["Στήσιμο beat", "Γράψιμο κουπλέ", "Ηχογράφηση vocals", "Performance και διαδικασία στην κάμερα"].map((item) => (
                <div key={item} className="border border-[var(--line)] bg-[var(--panel)] p-4 font-bold">{item}</div>
              ))}
            </div>
          </section>
        </div>

        <aside>
          <div className="sticky top-24 border border-[var(--line)] bg-[var(--panel)] p-5">
            <h2 className="display-font text-4xl">Team / Credits</h2>
            <div className="mt-5 grid gap-3">
              {team.map((member) => (
                <div key={member.name} className="border-t border-[var(--line)] pt-3">
                  <p className="font-black">{isValidHttpUrl(member.url) ? <a href={member.url} target="_blank" rel="noreferrer" className="hover:text-[var(--accent)]">{member.name}</a> : member.name}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{member.role}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-6 text-[var(--muted)]">Ανεξάρτητη παραγωγή με άμεση επιμέλεια περιεχομένου, εικόνας και ήχου από την ομάδα.</p>
          </div>
        </aside>
      </div>
    </Container>
  );
}
