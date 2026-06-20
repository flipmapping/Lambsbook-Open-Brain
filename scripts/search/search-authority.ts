import fs from "fs";

const query = process.argv.slice(2).join(" ").trim();

if (!query) {
  console.error(
    'Usage: npm run brain:search-authority -- "query"'
  );
  process.exit(1);
}

const indexPath = "indexes/authority-index.json";

if (!fs.existsSync(indexPath)) {
  throw new Error(
    "Authority index not found. Run brain:index-authority first."
  );
}

const records = JSON.parse(
  fs.readFileSync(indexPath, "utf8")
);

const results: {
  file: string;
  score: number;
}[] = [];

for (const record of records) {
  const content = fs.readFileSync(
    record.file,
    "utf8"
  );

  const score =
    content.toLowerCase()
      .split(query.toLowerCase())
      .length - 1;

  if (score > 0) {
    results.push({
      file: record.file,
      score
    });
  }
}

results.sort(
  (a, b) => b.score - a.score
);

console.log("");
console.log("Authority Search Results");
console.log("");

for (const result of results.slice(0, 20)) {
  console.log(
    `${result.score} | ${result.file}`
  );
}
