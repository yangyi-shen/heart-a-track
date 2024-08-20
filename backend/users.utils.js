import postgres from "postgres"
import 'dotenv/config';

const connectionString = process.env.DATABASE_URI

async function registerUser(username, password) {
    const sql = postgres(connectionString)
    const exists = await checkUser(username, password)

    if (exists) {
        throw new Error('ERROR: User already exists!')
    } else {
        await sql`
            INSERT INTO users (username, password) VALUES (${username}, ${password})
        `
    }

    await sql.end();
}

async function loginUser(username, password) {
    const sql = postgres(connectionString)
    const exists = await checkUser(username, password)

    if (!exists) {
        throw new Error('ERROR: User does not exist!')
    }
    
    await sql.end();
}

async function checkUser(username, password) {
    const sql = postgres(connectionString)

    const response = await sql`
        SELECT EXISTS(SELECT 1 FROM users WHERE username = ${username} AND password = ${password})
    `
    const exists = response[0].exists;

    await sql.end();
    return exists;
}