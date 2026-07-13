import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="py-20">
      <div className="border border-[var(--line)] bg-[var(--panel)] p-8">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent)]">404</p>
        <h1 className="display-font mt-3 text-6xl leading-none">Η σελίδα δεν βρέθηκε</h1>
        <p className="mt-4 max-w-xl text-[var(--muted)]">Το link μπορεί να άλλαξε ή το περιεχόμενο να μην έχει δημοσιευτεί ακόμα.</p>
        <Link href="/" className="mt-6 inline-flex min-h-12 items-center bg-[var(--accent)] px-5 py-3 font-black text-black">Επιστροφή στην αρχική</Link>
      </div>
    </Container>
  );
}
