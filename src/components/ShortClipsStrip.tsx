import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";

const clips = [
  {
    title: { el: "Τι είναι το Ραπ Στα Μπαμ;", en: "What is Rap Sta Bam?" },
    src: "/assets/promo/clips/clip-01-diy-concept.mp4",
    poster: "/assets/promo/clips/posters/clip-01-diy-concept.jpg"
  },
  {
    title: { el: "Από ένα sample ξεκινάει το beat", en: "The beat starts with a sample" },
    src: "/assets/promo/clips/clip-06-simple-sample.mp4",
    poster: "/assets/promo/clips/posters/clip-06-simple-sample.jpg"
  },
  {
    title: { el: "Το πρώτο verse", en: "The first verse" },
    src: "/assets/promo/clips/clip-09-final-verse.mp4",
    poster: "/assets/promo/clips/posters/clip-09-final-verse.jpg"
  }
];

export function ShortClipsStrip({ locale = "el" }: { locale?: string }) {
  const isEn = locale === "en";
  return (
    <section className="border-b border-[var(--line)] py-14">
      <Container>
        <SectionHeading eyebrow={isEn ? "Clips" : "Αποσπάσματα"} title={isEn ? "Moments from the room" : "Κομμάτια από το δωμάτιο"} copy={isEn ? "Short clips from the first episode: the concept, the sample, and the verse. Moments from the creative process." : "Μικρά clips από το πρώτο επεισόδιο: concept, sample, verse. Όχι trailer λογική, απλά στιγμές από τη διαδικασία."} />
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
              <div className="border-t border-[var(--line)] px-4 py-4">
                <h3 className="text-base font-black text-[var(--foreground)]">{isEn ? clip.title.en : clip.title.el}</h3>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
