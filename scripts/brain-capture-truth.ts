import fs from "fs";

const captureUrl = process.env.OPEN_BRAIN_CAPTURE_URL;
const anonKey = process.env.OPEN_BRAIN_ANON_KEY;

const REQUIRED_FIELDS = [
  "ID:",
  "TITLE:",
  "DOMAIN:",
  "AUTHORITY:",
  "STATUS:",
  "TYPE:",
  "EVIDENCE:",
  "TRUTH:",
  "MEANING:",
  "RULE:",
  "SOURCE:",
  "TIMESTAMP:"
];

async function main() {
  const file = process.argv[2];

  if (!file) {
    console.error(
      "Usage: npm run brain:capture-truth -- <truth-file>"
    );
    process.exit(1);
  }

  if (!fs.existsSync(file)) {
    throw new Error(`Truth file not found: ${file}`);
  }

  const content = fs.readFileSync(file, "utf8");

  for (const field of REQUIRED_FIELDS) {
    if (!content.includes(field)) {
      throw new Error(
        `Missing required field: ${field}`
      );
    }
  }

  if (!captureUrl) {
    throw new Error("Missing OPEN_BRAIN_CAPTURE_URL");
  }

  if (!anonKey) {
    throw new Error("Missing OPEN_BRAIN_ANON_KEY");
  }

  const response = await fetch(captureUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${anonKey}`,
    },
    body: JSON.stringify({
      content,
      type: "certified_truth",
      metadata: {
        source: "truth-publisher",
        local_file: file,
      },
    }),
  });

  const data = await response.json();

  console.log("");
  console.log("Truth published");
  console.log("");
  console.log(data);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
