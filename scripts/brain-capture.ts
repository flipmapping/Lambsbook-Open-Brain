const captureUrl = process.env.OPEN_BRAIN_CAPTURE_URL;
const anonKey = process.env.OPEN_BRAIN_ANON_KEY;

async function main() {
  const content = process.argv.slice(2).join(" ").trim();

  if (!content) {
    console.error('Usage: npm run brain:capture -- "text to capture"');
    process.exit(1);
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
      type: "development_note",
      metadata: {
        source: "replit-cli",
      },
    }),
  });

  const data = await response.json();

  console.log("\nOpen Brain capture result\n");
  console.log(data);
}

main().catch((error) => {
  console.error("Open Brain capture failed:");
  console.error(error);
  process.exit(1);
});
