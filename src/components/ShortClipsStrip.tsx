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
        <SectionHeading eyebrow="Αποσπάσματα" title="Κομμάτια από το δωμάτιο" copy="Μικρά clips από το πρώτο επεισόδιο: concept, sample, verse. Όχι trailer λογική, απλά στιγμές από τη διαδικασία." />
        <div className="grid gap-4 sm:grid-cols-3">
          {clips.map((clip) => (
            <article key={clip.src} className="border-y border-[var(--line)] bg-transparent">
              <video
                className="aspect-[9/16] w-full bg-black object-cover"
                src={clip.src}
                poster={clip.poster}
                controls
                playsInline
                preload="metadata"
              />
              <div className="border-t border-[var(--line)] py-4">
                <h3 className="text-base font-black text-[var(--foreground)]">{clip.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
