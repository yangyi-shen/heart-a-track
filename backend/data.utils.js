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
    const startDate = new Date();
    if (range == 'week') {
        const endDate = new Date(startDate.getDate() - 7);
        return await getRangeData(userId, startDate, endDate);
    } else if (range == 'month') {
        const endDate = new Date(startDate.getMonth() - 1);
        return await getRangeData(userId, startDate, endDate);
    } else if (range == 'year') {
        const endDate = new Date(startDate.getFullYear() - 7);
        return await getRangeData(userId, startDate, endDate);
    }
}

async function getRangeData(userId, start, end) {
    const sql = postgres(connectionString)
    const ISOstart = start.toISOString().replace('Z', '+00').replace('T', ' ');
    const ISOend = end.toISOString().replace('Z', '+00').replace('T', ' ');

    const response = await sql`
        SELECT * FROM data WHERE created_at BETWEEN ${ISOend} AND ${ISOstart} AND user_id = ${userId}
    `

    await sql.end();
    return response
}

export { writeData, getData }