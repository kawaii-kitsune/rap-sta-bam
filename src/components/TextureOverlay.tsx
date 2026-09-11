export function TextureOverlay({ variant = "grain" }: { variant?: "grain" | "halftone" }) {
  return <span aria-hidden="true" className={`print-texture print-texture-${variant}`} />;
}
