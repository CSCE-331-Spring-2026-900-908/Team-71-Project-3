//db connection
import { Pool } from "pg";
// used in the api folders for db queries
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
