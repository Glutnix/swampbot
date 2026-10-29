import { text } from "drizzle-orm/sqlite-core";

export const timestamps = {
  updated_at: text()
    .notNull()
    .$defaultFn(() => new Date().toISOString())
    .$onUpdateFn(() => new Date().toISOString()),
  created_at: text()
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  deleted_at: text(),
};
