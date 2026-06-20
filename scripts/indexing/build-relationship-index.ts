import fs from "fs";
import path from "path";

const ROOT = "relationships";

const edges: any[] = [];

function walk(dir: string) {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);

    if (fs.statSync(full).isDirectory()) {
      walk(full);
      continue;
    }

    if (!full.endsWith(".md")) continue;

    const content = fs.readFileSync(
      full,
      "utf8"
    );

    const source =
      content.match(/SOURCE:\s*([^\n]+)/)?.[1]?.trim();

    const relationship =
      content.match(/RELATIONSHIP:\s*([^\n]+)/)?.[1]?.trim();

    const target =
      content.match(/TARGET:\s*([^\n]+)/)?.[1]?.trim();

    if (
      source &&
      relationship &&
      target
    ) {
      edges.push({
        source,
        relationship,
        target,
        file: full
      });
    }
  }
}

walk(ROOT);

fs.writeFileSync(
  "indexes/relationship-index.json",
  JSON.stringify(edges, null, 2)
);

console.log(
  `Indexed ${edges.length} relationships`
);
