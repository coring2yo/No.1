import { sql } from '@vercel/postgres';

export async function initDatabase() {
    try {
        await sql`
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

export async function getAllMessages() {
    const { rows } = await sql`SELECT * FROM messages ORDER BY timestamp DESC`;
    return rows;
}

export async function createMessage(message) {
    const { text, recipient, author, color, image, timestamp } = message;
    const { rows } = await sql`
    INSERT INTO messages (text, recipient, author, color, image, timestamp)
    VALUES (${text}, ${recipient}, ${author}, ${color}, ${image}, ${timestamp})
    RETURNING *
  `;
    return rows[0];
}

export async function updateMessage(id, message) {
    const { text, recipient, author, color, image } = message;
    const { rows } = await sql`
    UPDATE messages
    SET text = ${text}, recipient = ${recipient}, author = ${author}, 
        color = ${color}, image = ${image}
    WHERE id = ${id}
    RETURNING *
  `;
    return rows[0];
}

export async function deleteMessage(id) {
    await sql`DELETE FROM messages WHERE id = ${id}`;
    return { success: true };
}
