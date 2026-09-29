import teamDataEl from "@/content/team.json";
import teamDataEn from "@/content/team.en.json";
import type { TeamMember } from "@/types/content";

export const teamEl = teamDataEl as TeamMember[];
export const teamEn = teamDataEn as TeamMember[];

export function getTeam(locale = "el"): TeamMember[] {
  return locale === "en" ? teamEn : teamEl;
}

export const team = teamEl;
