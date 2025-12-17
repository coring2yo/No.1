import { createPool } from '@vercel/postgres';

// Create a pool using the pooled connection string
// POSTGRES_PRISMA_URL is the pooled connection, POSTGRES_URL is direct connection
const pool = createPool({
    connectionString: process.env.POSTGRES_PRISMA_URL
});

// Initialize database
async function initDatabase() {
    try {
        await pool.sql`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        recipient VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        color VARCHAR(50),
        image TEXT,
        timestamp BIGINT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Database initialization error:', error);
        throw error;
    }
}

async function getAllMessages() {
    const { rows } = await pool.sql`SELECT * FROM messages ORDER BY timestamp DESC`;
    return rows;
}

async function createMessage(message) {
    const { text, recipient, author, color, image, timestamp } = message;
    const { rows } = await pool.sql`
    INSERT INTO messages (text, recipient, author, color, image, timestamp)
    VALUES (${text}, ${recipient}, ${author}, ${color}, ${image}, ${timestamp})
    RETURNING *
  `;
    return rows[0];
}

// Main handler
export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        // Check if database environment variables are set
        if (!process.env.POSTGRES_URL) {
            console.error('POSTGRES_URL environment variable is not set');
            return res.status(500).json({
                error: 'Database configuration error',
                message: 'Database environment variables are not configured'
            });
        }

        // Initialize database on first request
        await initDatabase();

        if (req.method === 'GET') {
            const messages = await getAllMessages();
            return res.status(200).json(messages);
        }

        if (req.method === 'POST') {
            const message = await createMessage(req.body);
            return res.status(201).json(message);
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API error:', error);
        console.error('Error stack:', error.stack);
        return res.status(500).json({
            error: 'Internal server error',
            message: error.message,
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}
