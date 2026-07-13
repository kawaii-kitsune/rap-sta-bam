import Image from "next/image";

export function EpisodeGallery({ images, title }: { images?: string[]; title: string }) {
  if (!images?.length) {
    return null;
  }

  const [lead, ...rest] = images;

  return (
    <div className="grid gap-4">
      <div className="relative aspect-[16/10] overflow-hidden border border-[var(--line)] bg-black hard-shadow">
        <Image
          src={lead}
          alt={`Κεντρική behind the scenes εικόνα για ${title}`}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--accent)]">Behind the scenes</p>
        </div>
      </div>

      {rest.length ? (
        <div className="grid auto-rows-[minmax(180px,1fr)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((image, index) => {
            const wide = index === 1 || index === rest.length - 1;

            return (
              <div key={image} className={`relative overflow-hidden border border-[var(--line)] bg-black ${wide ? "sm:col-span-2" : ""}`}>
                <Image
                  src={image}
                  alt={`Behind the scenes εικόνα ${index + 2} για ${title}`}
                  fill
                  sizes={wide ? "(min-width: 1024px) 40vw, 100vw" : "(min-width: 1024px) 20vw, 50vw"}
                  className="object-cover grayscale transition duration-300 hover:scale-105 hover:grayscale-0"
                />
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
