import postgres from "postgres"
import 'dotenv/config';

const connectionString = process.env.DATABASE_URI

const sql = postgres(connectionString)
await sql.end();