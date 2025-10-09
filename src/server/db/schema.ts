import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("evaluations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const criteriaTable = pgTable("criteria", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  weight: integer().notNull(),
});
