import { sql } from '@vercel/postgres';

const migrateColor = (oldColor) => {
    const mapping = {
        '#FFB3BA': '#E91E63',
        '#FFDFBA': '#E65100',
        '#FFFFBA': '#2C3E50',
        '#BAFFC9': '#2E7D32',
        '#BAE1FF': '#1565C0',
        '#C9C9FF': '#6A1B9A',
        '#E0BBE4': '#283593'
    };
    return mapping[oldColor?.toUpperCase()] || oldColor;
};

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
    return rows.map(msg => ({
        ...msg,
        color: migrateColor(msg.color)
    }));
}

export async function createMessage(message) {
    const { text, recipient, author, color, image, timestamp } = message;
    const migratedColor = migrateColor(color);
    const { rows } = await sql`
    INSERT INTO messages (text, recipient, author, color, image, timestamp)
    VALUES (${text}, ${recipient}, ${author}, ${migratedColor}, ${image}, ${timestamp})
    RETURNING *
  `;
    return {
        ...rows[0],
        color: migrateColor(rows[0].color)
    };
}

export async function updateMessage(id, message) {
    const { text, recipient, author, color, image } = message;
    const migratedColor = migrateColor(color);
    const { rows } = await sql`
    UPDATE messages
    SET text = ${text}, recipient = ${recipient}, author = ${author}, 
        color = ${migratedColor}, image = ${image}
    WHERE id = ${id}
    RETURNING *
  `;
    return {
        ...rows[0],
        color: migrateColor(rows[0].color)
    };
}

export async function deleteMessage(id) {
    await sql`DELETE FROM messages WHERE id = ${id}`;
    return { success: true };
}
