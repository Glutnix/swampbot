import { drizzle } from "drizzle-orm/libsql";
import { config } from "./config";

const db = drizzle(config.DB_FILE_NAME!);
export default db;
