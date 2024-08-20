import postgres from "postgres"
import 'dotenv/config';

const connectionString = process.env.DATABASE_URI

async function registerUser(username, password) {
    const sql = postgres(connectionString)

    const response = await sql`
        INSERT INTO users (username, password) VALUES (${username}, ${password})
    `

    await sql.end();
}

async function loginuser(username, password) {
    const sql = postgres(connectionString)

    const response = await sql`
        SELECT * FROM users WHERE (username = ${username} AND password = ${password})
    `
    
    await sql.end();
}