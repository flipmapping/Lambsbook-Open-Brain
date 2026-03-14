import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const SEARCH_URL = process.env.OPEN_BRAIN_SEARCH_URL;
const ANON_KEY = process.env.OPEN_BRAIN_ANON_KEY;

app.get("/", (_req, res) => {
  res.json({
    service: "Open Brain MCP bridge",
    status: "running",
  });
});

/*
SEARCH ENTRIES
*/
app.post("/search_entries", async (req, res) => {
  try {
    const { query, match_count = 5 } = req.body ?? {};

    if (!query) {
      return res.status(400).json({ error: "query required" });
    }

    const response = await fetch(SEARCH_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ANON_KEY}`,
      },
      body: JSON.stringify({
        query,
        match_count,
      }),
    });

    const data = await response.json();

    return res.json(data);
  } catch (err) {
    return res.status(500).json({
      error: "search failed",
      details: err instanceof Error ? err.message : String(err),
    });
  }
});

/*
LIST RECENT ENTRIES
*/
app.get("/list_recent_entries", async (_req, res) => {
  try {
    const response = await fetch(SEARCH_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ANON_KEY}`,
      },
      body: JSON.stringify({
        query: "recent development notes",
        match_count: 10,
      }),
    });

    const data = await response.json();

    return res.json(data);
  } catch (err) {
    return res.status(500).json({
      error: "recent query failed",
      details: err instanceof Error ? err.message : String(err),
    });
  }
});

/*
GET ENTRY BY ID
*/
app.get("/get_entry_by_id/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const response = await fetch(SEARCH_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ANON_KEY}`,
      },
      body: JSON.stringify({
        query: id,
        match_count: 1,
      }),
    });

    const data = await response.json();

    return res.json(data);
  } catch (err) {
    return res.status(500).json({
      error: "entry lookup failed",
      details: err instanceof Error ? err.message : String(err),
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Open Brain MCP bridge running on port ${PORT}`);
});
