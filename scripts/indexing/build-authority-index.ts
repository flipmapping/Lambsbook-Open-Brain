import fs from "fs";
import path from "path";

const ROOTS = [
  "truths",
  "lessons",
  "decisions",
  "relationships"
];

const records: any[] = [];

function walk(dir: string) {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);

    if (fs.statSync(full).isDirectory()) {
      walk(full);
      continue;
    }

    if (!full.endsWith(".md")) continue;

    records.push({
      file: full
    });
  }
}

for (const root of ROOTS) {
  walk(root);
}

fs.mkdirSync("indexes", {
  recursive: true
});

fs.writeFileSync(
  "indexes/authority-index.json",
  JSON.stringify(records, null, 2)
);

console.log("");
console.log(
  `Indexed ${records.length} authority artifacts`
);
console.log("");
console.log(
  "indexes/authority-index.json"
);
