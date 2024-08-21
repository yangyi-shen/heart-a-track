import postgres from "postgres"
import 'dotenv/config';

const connectionString = process.env.DATABASE_URI

async function writeData(userId, bp, hr) {
    const sql = postgres(connectionString)

    await sql`
        INSERT INTO data (user_id, bp, hr) VALUES (${userId}, ${bp}, ${hr})
    `

    await sql.end();
}

async function getData(userId, range) {
    switch(range) {
        case 'week':

        case 'month':

        case 'year':
    }
}

async function getRangeData(start, end) {
    const sql = postgres(connectionString)
    const ISOstart = start.toISOString().replace('Z', '+00').replace('T', ' ');
    const ISOend = end.toISOString().replace('Z', '+00').replace('T', ' ');

    const response = await sql`
        SELECT * FROM data WHERE created_at BETWEEN ${ISOend} AND ${ISOstart}
    `

    await sql.end();
    return response
}