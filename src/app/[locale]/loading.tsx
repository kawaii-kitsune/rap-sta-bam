import { Container } from "@/components/Container";

export default function Loading() {
  return (
    <Container className="page-shell">
      <div role="status" aria-busy="true">
        <span className="sr-only">Φόρτωση περιεχομένου…</span>
        <div aria-hidden="true" className="motion-safe:animate-pulse">
          <div className="mb-8 h-4 w-32 rounded bg-[var(--panel-2)]" />
          <div className="mb-4 h-10 w-3/4 max-w-sm rounded bg-[var(--panel-2)]" />
          <div className="mb-10 h-4 w-full max-w-lg rounded bg-[var(--panel)]" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div key={item}>
                <div className="mb-4 aspect-[16/10] rounded-lg bg-[var(--panel)]" />
                <div className="mb-3 h-5 w-1/2 rounded bg-[var(--panel-2)]" />
                <div className="h-3 w-3/4 rounded bg-[var(--panel)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
