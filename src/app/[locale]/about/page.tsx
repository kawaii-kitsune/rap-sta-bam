import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { defaultLocale } from "@/config/i18n";
import { releaseCadence, releaseSchedule } from "@/config/site";
import { getTeam } from "@/content/team";
import { isValidHttpUrl } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale = defaultLocale } = await params;
  const isEn = locale === "en";

  return createMetadata({
    title: isEn ? "About the Project" : "Σχετικά",
    description: isEn
      ? "The philosophy, creative process, and independent team behind Rap Sta Bam."
      : "Η φιλοσοφία, η διαδικασία και η ομάδα πίσω από το Ραπ Στα Μπαμ.",
    path: `/${locale}/about`,
    locale
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale = defaultLocale } = await params;
  const isEn = locale === "en";
  const teamMembers = getTeam(locale);

  return (
    <Container className="page-shell">
      <Breadcrumbs items={[{ label: isEn ? "About" : "Σχετικά" }]} />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <div className="page-heading">
            <SectionHeading
              as="h1"
              eyebrow={isEn ? "About" : "Σχετικά"}
              title={isEn ? "With whatever we have, the best we can" : "Με ό,τι έχουμε, όπως μπορούμε"}
            />
          </div>
          <div className="prose-rsb max-w-3xl text-lg leading-8 text-[var(--muted)]">
            {isEn ? (
              <>
                <p>Rap Sta Bam is an independent DIY music series based in Heraklion, Crete.</p>
                <p>
                  In every episode, we invite an MC to share their story and step into a studio session without any pre-written songs. We build a beat from scratch, write bars, record vocals, and document the entire creative journey on camera.
                </p>
                <p>
                  We never conceal the messy process behind the final cut. We care about the spontaneous ideas, heated room debates, funny mishaps, and that electric moment when a collection of loops clicks into a finished track.
                </p>
                <p>
                  Our mindset is purely DIY: utilizing whatever equipment is in the room, pushing through creative pressure, until the first sample transforms into a final vocal take.
                </p>
              </>
            ) : (
              <>
                <p>Το Ραπ Στα Μπαμ είναι μία ανεξάρτητη DIY μουσική σειρά με βάση το Ηράκλειο Κρήτης.</p>
                <p>
                  Σε κάθε επεισόδιο, καλούμε έναν rapper να μας αφηγηθεί την ιστορία του και να μπει στο session χωρίς έτοιμο κομμάτι. Φτιάχνουμε ένα beat, γράφεται ένα κουπλέ, γίνεται η ηχογράφηση και η κάμερα κρατάει όλη τη διαδρομή.
                </p>
                <p>
                  Δεν κρύβουμε τη διαδικασία πίσω από το τελικό αποτέλεσμα. Μας ενδιαφέρουν οι ιδέες, οι γνώμες μέσα στο δωμάτιο, τα λάθη, τα αστεία, οι δοκιμές και η στιγμή που κάτι αρχίζει να ακούγεται σαν κομμάτι.
                </p>
                <p>
                  Η λογική είναι do it yourselves: με ό,τι υπάρχει εκείνη τη στιγμή, όπως μπορούμε, μέχρι το πρώτο sample να γίνει take.
                </p>
              </>
            )}
          </div>

          <section className="mt-12">
            <SectionHeading title={isEn ? "The Philosophy" : "Η λογική"} />
            <p className="max-w-3xl text-lg leading-8 text-[var(--muted)]">
              {isEn
                ? "The series operates on pure DIY principles: making raw music with the gear at hand and letting genuine collaboration shine through. Each artist shares where they started, what shaped their voice, and why they push forward. Spontaneous decisions, flawed takes, time pressure, and honest crew feedback all stay inside the cut."
                : "Η σειρά πατάει σε DIY λογική: φτιάχνουμε μουσική με ό,τι υπάρχει εκείνη τη στιγμή και αφήνουμε να φανεί η συνεργασία μέσα στο δωμάτιο. Κάθε καλεσμένος φέρνει την ιστορία του: από πού ξεκίνησε, τι τον διαμόρφωσε και γιατί συνεχίζει. Οι γρήγορες επιλογές, τα λάθος takes, η πίεση του χρόνου και οι γνώμες της παρέας μένουν μέσα στο επεισόδιο."}
            </p>
          </section>

          <section className="mt-12">
            <SectionHeading
              title={isEn ? "Release Schedule" : "Πρόγραμμα"}
              copy={isEn ? "One new episode every month" : releaseCadence}
            />
            <div className="grid gap-0 border-y border-[var(--line)] sm:grid-cols-2">
              {releaseSchedule.map((item) => (
                <time
                  key={item.date}
                  dateTime={item.date}
                  className="border-b border-[var(--line)] p-4 sm:odd:border-r"
                >
                  <span className="meta-font mb-2 block text-lg text-[var(--accent)]">{item.label}</span>
                  <span className="text-sm font-bold text-[var(--muted)]">{item.title}</span>
                </time>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <SectionHeading title={isEn ? "What happens in a session" : "Τι συμβαίνει στο session"} />
            <ol className="grid gap-0 border-y border-[var(--line)]">
              {(isEn
                ? ["Beat Production", "Writing Verses", "Recording Vocals", "Live Performance on Camera"]
                : ["Στήσιμο beat", "Γράψιμο κουπλέ", "Ηχογράφηση vocals", "Performance και διαδικασία στην κάμερα"]
              ).map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[3rem_1fr] border-b border-[var(--line)] px-4 py-4 font-bold last:border-b-0 sm:px-5"
                >
                  <span className="text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside>
          <div className="quiet-aside lg:sticky lg:top-24">
            <h2 className="card-title">{isEn ? "Team & Crew" : "Ομάδα"}</h2>
            <div className="mt-5 grid gap-3">
              {teamMembers.map((member) => (
                <div key={member.name} className="border-t border-[var(--line)] pt-3">
                  <p className="font-black">
                    {isValidHttpUrl(member.url) ? (
                      <a href={member.url} target="_blank" rel="noreferrer" className="hover:text-[var(--accent)]">
                        {member.name}
                      </a>
                    ) : (
                      member.name
                    )}
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{member.role}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-6 text-[var(--muted)]">
              {isEn
                ? "Independent production with direct curation of sound, visual design, and editing by our crew."
                : "Ανεξάρτητη παραγωγή με άμεση επιμέλεια περιεχομένου, εικόνας και ήχου από την ομάδα."}
            </p>
          </div>
        </aside>
      </div>
    </Container>
  );
}
