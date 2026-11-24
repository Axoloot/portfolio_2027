import { about, automations, education, impact, projects, roles, site, skills } from "@/content/data";
import { dictionaries } from "@/content/ui";

// Plain-text profile for AI answer engines (https://llmstxt.org), built from the same content as the site.
export function GET() {
  const t = dictionaries.en;
  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${t.meta.title.replace(`${site.name} · `, "")}. ${t.hero.keywords}. ${t.hero.role} ${t.status}.`,
    "",
    t.hero.lede,
    "",
    `- Website: ${site.url} (English: ${site.url}/en, French: ${site.url}/fr)`,
    `- Email: ${site.email}`,
    ...site.links.map((l) => `- ${l.label}: ${l.href}`),
    `- CV (PDF): ${site.url}${site.cv.en} (English), ${site.url}${site.cv.fr} (French)`,
    `- Languages: ${t.skills.spokenValue}`,
    "",
    "## Results",
    ...impact.map((m) => `- ${m.delta} ${m.name.en}: ${m.how.en}`),
    "",
    "## Manual work automated",
    ...automations.map((a) => `- ${a.where.en}. Before: ${a.before.en} After: ${a.after.en} Runs on: ${a.runs.en}.`),
    "",
    "## Experience",
  ];
  for (const r of roles) {
    lines.push("", `### ${r.company.en}: ${r.role.en} (${r.when.en})`);
    if (r.kind) lines.push(r.kind.en);
    for (const b of r.bullets?.en ?? []) lines.push(`- ${b}`);
    if (r.tags?.length) lines.push(`- Stack: ${r.tags.join(", ")}`);
  }
  lines.push("", "## Projects");
  for (const p of projects) {
    lines.push("", `### ${p.title.en} (${p.kind.en}${p.when ? `, ${p.when}` : ""})`, p.summary.en);
    for (const b of p.bullets?.en ?? []) lines.push(`- ${b}`);
    for (const l of p.links) lines.push(`- ${l.label.en}: ${l.href}`);
  }
  lines.push("", "## Skills");
  for (const g of [...skills.automate, ...skills.host, ...skills.secure]) {
    lines.push(`- ${g.title.en}: ${[...g.lead, ...g.other].join(", ")}. Proof: ${g.proof.en}`);
  }
  lines.push("", "## Education");
  for (const e of education) lines.push(`- ${e.title} (${e.when}): ${e.text.en}`);
  lines.push("", "## About");
  for (const a of about) lines.push(`- ${a.title.en}: ${a.text.en.replace(/\n/g, " ")}`);
  return new Response(lines.join("\n") + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
