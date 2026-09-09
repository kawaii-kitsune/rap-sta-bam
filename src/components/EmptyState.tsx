import { Disc3 } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({ title, copy, action }: { title: string; copy: string; action?: ReactNode }) {
  return (
    <div className="empty-state">
      <Disc3 className="h-8 w-8" aria-hidden="true" />
      <h2 className="card-title">{title}</h2>
      <p>{copy}</p>
      {action}
    </div>
  );
}
