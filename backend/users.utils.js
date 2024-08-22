import postgres from "postgres"
import 'dotenv/config';

const connectionString = process.env.DATABASE_URI

async function registerUser(username, password) {
    const sql = postgres(connectionString)
    const user = await checkUser(username, password)

    if (user) {
        throw new Error('ERROR: User already exists!')
    } else {
        await sql`
            INSERT INTO users (username, password) VALUES (${username}, ${password})
        `
    }

    await sql.end();
    return user;
}

async function loginUser(username, password) {
    const sql = postgres(connectionString)
    const user = await checkUser(username, password)

    if (!user) {
        throw new Error('ERROR: User does not exist!')
    }
    
    await sql.end();
    return user;
}

async function checkUser(username, password) {
    const sql = postgres(connectionString)

    const response = await sql`
        SELECT * FROM users WHERE username = ${username} AND password = ${password}
    `

    await sql.end();
    if (response[0]) {
        return response[0]
    } else {
        return false
    }
}

export default { registerUser, loginUser }