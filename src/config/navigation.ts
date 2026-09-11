export const navItems = [
  { href: "/", label: "Αρχική" },
  { href: "/episodes", label: "Sessions" },
  { href: "/artists", label: "Το crew" },
  { href: "/products", label: "Releases" },
  { href: "/about", label: "Το project" },
  { href: "/#contact", label: "Μίλα μας" }
] as const;

export function isNavActive(pathname: string, href: string) {
  if (href.includes("#")) return false;
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
