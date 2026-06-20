import fs from "fs";

const node = process.argv[2];

if (!node) {
  console.error(
    "Usage: npm run brain:traverse -- <node>"
  );
  process.exit(1);
}

const indexPath =
  "indexes/relationship-index.json";

if (!fs.existsSync(indexPath)) {
  throw new Error(
    "Relationship index not found."
  );
}

const edges = JSON.parse(
  fs.readFileSync(indexPath, "utf8")
);

const matches = edges.filter(
  (e: any) =>
    e.source === node ||
    e.target === node
);

console.log("");
console.log(node);
console.log("");

for (const edge of matches) {
  if (edge.source === node) {
    console.log(
      `${node} --${edge.relationship}--> ${edge.target}`
    );
  } else {
    console.log(
      `${edge.source} --${edge.relationship}--> ${node}`
    );
  }
}
