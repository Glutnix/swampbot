import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamps } from "./columns.helpers";

export const usersTable = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  birthday: text(),
  discord_user_id: text().notNull().unique(),
  ...timestamps,
});
