import { Router, type IRouter } from "express";
import { db, thoughtsTable } from "@workspace/db";
import {
  CreateThoughtBody,
  UpdateThoughtBody,
  ListThoughtsQueryParams,
  GetThoughtParams,
  UpdateThoughtParams,
  DeleteThoughtParams,
} from "@workspace/api-zod";
import { eq, ilike, or, desc, sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/thoughts", async (req, res) => {
  const parsed = ListThoughtsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid query params" });
    return;
  }

  const { category, search } = parsed.data;

  let query = db
    .select()
    .from(thoughtsTable)
    .orderBy(desc(thoughtsTable.pinned), desc(thoughtsTable.updatedAt))
    .$dynamic();

  if (category) {
    query = query.where(eq(thoughtsTable.category, category));
  }

  if (search) {
    const likePattern = `%${search}%`;
    const searchFilter = or(
      ilike(thoughtsTable.content, likePattern),
      ilike(thoughtsTable.category, likePattern),
    );
    query = query.where(searchFilter!);
  }

  const thoughts = await query;
  res.json(thoughts);
});

router.post("/thoughts", async (req, res) => {
  const parsed = CreateThoughtBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { content, category, tags, pinned } = parsed.data;

  const [thought] = await db
    .insert(thoughtsTable)
    .values({
      content,
      category: category ?? "general",
      tags: tags ?? [],
      pinned: pinned ?? false,
    })
    .returning();

  res.status(201).json(thought);
});

router.get("/thoughts/:id", async (req, res) => {
  const parsed = GetThoughtParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const [thought] = await db
    .select()
    .from(thoughtsTable)
    .where(eq(thoughtsTable.id, parsed.data.id));

  if (!thought) {
    res.status(404).json({ error: "Thought not found" });
    return;
  }

  res.json(thought);
});

router.put("/thoughts/:id", async (req, res) => {
  const paramsParsed = UpdateThoughtParams.safeParse({
    id: Number(req.params.id),
  });
  if (!paramsParsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const bodyParsed = UpdateThoughtBody.safeParse(req.body);
  if (!bodyParsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const updates: Partial<typeof thoughtsTable.$inferInsert> = {
    ...bodyParsed.data,
    updatedAt: new Date(),
  };

  const [thought] = await db
    .update(thoughtsTable)
    .set(updates)
    .where(eq(thoughtsTable.id, paramsParsed.data.id))
    .returning();

  if (!thought) {
    res.status(404).json({ error: "Thought not found" });
    return;
  }

  res.json(thought);
});

router.delete("/thoughts/:id", async (req, res) => {
  const parsed = DeleteThoughtParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const [deleted] = await db
    .delete(thoughtsTable)
    .where(eq(thoughtsTable.id, parsed.data.id))
    .returning();

  if (!deleted) {
    res.status(404).json({ error: "Thought not found" });
    return;
  }

  res.status(204).send();
});

router.get("/categories", async (_req, res) => {
  const rows = await db
    .selectDistinct({ category: thoughtsTable.category })
    .from(thoughtsTable)
    .orderBy(thoughtsTable.category);

  res.json(rows.map((r) => r.category));
});

export default router;
