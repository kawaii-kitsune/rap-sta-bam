import { getDictionary, defaultLocale } from "./i18n";

export function getNavItems(locale: string = defaultLocale) {
  const dict = getDictionary(locale);
  const prefix = `/${locale}`;

  return [
    { href: `${prefix}`, label: dict.nav.home },
    { href: `${prefix}/episodes`, label: dict.nav.episodes },
    { href: `${prefix}/artists`, label: dict.nav.artists },
    { href: `${prefix}/products`, label: dict.nav.products },
    { href: `${prefix}/about`, label: dict.nav.about },
    { href: `${prefix}/#contact`, label: dict.nav.contact }
  ];
}

export const navItems = getNavItems(defaultLocale);

export function isNavActive(pathname: string, href: string) {
  if (href.includes("#")) return false;
  if (pathname === href) return true;
  if (href.endsWith("/el") || href.endsWith("/en")) {
    return pathname === href;
  }
  return pathname.startsWith(`${href}/`);
}
