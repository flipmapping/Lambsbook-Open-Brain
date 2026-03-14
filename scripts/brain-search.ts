const searchUrl = process.env.OPEN_BRAIN_SEARCH_URL;
const anonKey = process.env.OPEN_BRAIN_ANON_KEY;

async function main() {
  const query = process.argv.slice(2).join(" ").trim();

  if (!query) {
    console.error('Usage: npm run brain:search -- "search text"');
    process.exit(1);
  }

  if (!searchUrl) {
    throw new Error("Missing OPEN_BRAIN_SEARCH_URL");
  }

  if (!anonKey) {
    throw new Error("Missing OPEN_BRAIN_ANON_KEY");
  }

  const response = await fetch(searchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${anonKey}`,
    },
    body: JSON.stringify({
      query,
      match_count: 5,
    }),
  });

  const data = await response.json();

  console.log("\nOpen Brain Search Results\n");

  if (!data.results?.length) {
    console.log("No matches found.");
    return;
  }

  for (const result of data.results) {
    console.log(`• ${result.content}`);
    console.log(`  similarity: ${Number(result.similarity).toFixed(3)}`);
    console.log("");
  }
}

main().catch((error) => {
  console.error("Open Brain search failed:");
  console.error(error);
  process.exit(1);
});
