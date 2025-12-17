import { createPool } from '@vercel/postgres';

// Create a pool using the pooled connection string
// POSTGRES_PRISMA_URL is the pooled connection, POSTGRES_URL is direct connection
const pool = createPool({
    connectionString: process.env.POSTGRES_PRISMA_URL
});

async function updateMessage(id, message) {
    const { text, recipient, author, color, image } = message;
    const { rows } = await pool.sql`
    UPDATE messages
    SET text = ${text}, recipient = ${recipient}, author = ${author},
        color = ${color}, image = ${image}
    WHERE id = ${id}
    RETURNING *
  `;
    return rows[0];
}

async function deleteMessage(id) {
    await pool.sql`DELETE FROM messages WHERE id = ${id}`;
    return { success: true };
}

// Main handler
export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { id } = req.query;

    try {
        if (req.method === 'PUT') {
            const message = await updateMessage(parseInt(id), req.body);

            if (!message) {
                return res.status(404).json({ error: 'Message not found' });
            }

            return res.status(200).json(message);
        }

        if (req.method === 'DELETE') {
            await deleteMessage(parseInt(id));
            return res.status(200).json({ success: true });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
}
