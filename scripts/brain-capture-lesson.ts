import fs from "fs";

async function main() {
  const file = process.argv[2];

  if (!file) {
    console.error(
      "Usage: npm run brain:capture-lesson -- <lesson-file>"
    );
    process.exit(1);
  }

  if (!fs.existsSync(file)) {
    throw new Error(`Lesson file not found: ${file}`);
  }

  const content = fs.readFileSync(file, "utf8");

  if (!content.includes("Authority:")) {
    throw new Error(
      "Missing required field: Authority:"
    );
  }

  console.log("");
  console.log("Lesson loaded");
  console.log("");
  console.log(file);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
