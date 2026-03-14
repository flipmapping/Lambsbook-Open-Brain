import { createClient } from "@supabase/supabase-js";
import fetch from "node-fetch";

const SUPABASE_URL = process.env.MAIN_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.MAIN_SUPABASE_SERVICE_KEY!;

const OPEN_BRAIN_CAPTURE_URL = process.env.OPEN_BRAIN_CAPTURE_URL!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function capture(content: string) {
  await fetch(OPEN_BRAIN_CAPTURE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
      type: "verified_fact",
      source: "schema_sync",
      metadata: {
        project: "Lambsbook Cooperative Hub",
        category: "schema_sync",
      },
    }),
  });
}

async function syncTables() {
  const { data, error } = await supabase.rpc("get_table_structure");

  if (error) {
    console.error("Table sync failed:", error);
    return;
  }

  for (const row of data) {
    const fact = `Verified fact: table ${row.table_name} column ${row.column_name} type ${row.data_type}`;

    await capture(fact);
  }
}

async function main() {
  console.log("Starting schema sync");

  await syncTables();

  console.log("Schema sync complete");
}

main();
