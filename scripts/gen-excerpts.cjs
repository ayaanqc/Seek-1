const fs = require("fs");
const path = require("path");

const SPECS = [
  { key: "MEDITATIONS", title: "Meditations", id: 2680, anchor: "THE FIRST BOOK",
    credit: "Project Gutenberg \u00b7 trans. George Long (1862)", keepBreaks: false, count: 3 },
  { key: "WALDEN", title: "Walden", id: 205, anchor: "When I wrote the following pages",
    credit: "Project Gutenberg (1854)", keepBreaks: false, count: 3 },
  { key: "LEAVES_OF_GRASS", title: "Leaves of Grass", id: 1322, anchor: "I celebrate myself",
    credit: "Project Gutenberg (1855)", keepBreaks: true, count: 2 },
  { key: "SOULS_OF_BLACK_FOLK", title: "The Souls of Black Folk", id: 408, anchor: "Herein lie buried many things",
    credit: "Project Gutenberg (1903)", keepBreaks: false, count: 3 },
  { key: "THE_PROPHET", title: "The Prophet", id: 58585, anchor: "Almustafa, the chosen and the beloved",
    credit: "Project Gutenberg (1923)", keepBreaks: false, count: 2 },
];

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Gutenberg hard-wraps lines, so match the anchor across any whitespace run. */
function findAnchor(text, anchor) {
  const re = new RegExp(anchor.split(/\s+/).map(escapeRe).join("\\s+"));
  const m = re.exec(text);
  return m ? m.index : -1;
}

function isNoise(p) {
  if (/gutenberg|transcriber|produced by|www\.|ebook/i.test(p)) return true;
  if (/^\[?\s*(illustration|figure|plate|contents)/i.test(p)) return true;
  if (/^\d+$/.test(p)) return true;
  if (p.length < 180) return true;
  return false;
}

function clean(p, keepBreaks) {
  if (!keepBreaks) return p.replace(/\s+/g, " ").trim();
  return p.split(/\r?\n/).map((l) => l.replace(/[ \t]+/g, " ").trim()).filter(Boolean).join("\n").trim();
}

function extract(text, anchor, keepBreaks, count) {
  const at = findAnchor(text, anchor);
  if (at < 0) throw new Error("anchor not found: " + anchor);
  let body = text.slice(at);
  const end = body.search(/\*\*\*\s*END OF (THE|THIS) PROJECT GUTENBERG/i);
  if (end >= 0) body = body.slice(0, end);
  const paras = body.split(/\r?\n\s*\r?\n/).map((p) => clean(p, keepBreaks)).filter((p) => p.length && !isNoise(p));
  if (paras.length < count) throw new Error("only " + paras.length + " usable paragraphs");
  return paras.slice(0, count);
}

async function main() {
  const blocks = [];
  const credits = [];
  for (const spec of SPECS) {
    const res = await fetch("https://www.gutenberg.org/cache/epub/" + spec.id + "/pg" + spec.id + ".txt");
    if (!res.ok) throw new Error(spec.title + " fetch failed: " + res.status);
    const text = await res.text();
    const paras = extract(text, spec.anchor, spec.keepBreaks, spec.count);
    blocks.push("export const " + spec.key + ": string[] = " + JSON.stringify(paras, null, 2) + ";");
    credits.push("  " + spec.key + ": " + JSON.stringify(spec.credit));
    console.log(spec.title + " -> " + paras.length + " paras, chars: " + paras.map((p) => p.length).join("/"));
  }
  const out = [
    "// Verbatim public-domain text retrieved from Project Gutenberg.",
    "// Regenerate with: node scripts/gen-excerpts.cjs  (do not hand-edit)",
    "",
    ...blocks,
    "",
    "export const EXCERPT_CREDITS: Record<string, string> = {",
    credits.join(",\n"),
    "};",
    "",
  ].join("\n");
  fs.writeFileSync(path.join(__dirname, "..", "lib", "excerpts.ts"), out);
  console.log("wrote lib/excerpts.ts (" + out.length + " bytes)");
}

main().catch((e) => { console.error("ERROR: " + e.message); process.exitCode = 1; });