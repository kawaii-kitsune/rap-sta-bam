import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";

const clips = [
  {
    title: "Τι είναι το Ραπ Στα Μπαμ;",
    src: "/assets/promo/clips/clip-01-diy-concept.mp4",
    poster: "/assets/promo/clips/posters/clip-01-diy-concept.jpg"
  },
  {
    title: "Από ένα sample ξεκινάει το beat",
    src: "/assets/promo/clips/clip-06-simple-sample.mp4",
    poster: "/assets/promo/clips/posters/clip-06-simple-sample.jpg"
  },
  {
    title: "Το πρώτο verse",
    src: "/assets/promo/clips/clip-09-final-verse.mp4",
    poster: "/assets/promo/clips/posters/clip-09-final-verse.jpg"
  }
];

export function ShortClipsStrip() {
  return (
    <section className="border-b border-[var(--line)] py-14">
      <Container>
        <SectionHeading eyebrow="Shorts" title="Κάθετα clips από τη session" copy="Τρία σύντομα αποσπάσματα από το πρώτο επεισόδιο, έτοιμα για γρήγορο preview πριν την πρεμιέρα." />
        <div className="grid gap-5 sm:grid-cols-3">
          {clips.map((clip) => (
            <article key={clip.src} className="border border-[var(--line)] bg-[var(--panel)]">
              <video
                className="aspect-[9/16] w-full bg-black object-cover"
                src={clip.src}
                poster={clip.poster}
                controls
                playsInline
                preload="metadata"
              />
              <div className="border-t border-[var(--line)] p-4">
                <h3 className="text-sm font-black uppercase tracking-[0.14em] text-[var(--foreground)]">{clip.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
