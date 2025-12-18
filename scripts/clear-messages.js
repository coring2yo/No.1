import { sql } from '@vercel/postgres';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
try {
    const envPath = join(__dirname, '..', '.env.local');
    const envContent = readFileSync(envPath, 'utf-8');

    envContent.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=["']?([^"']+)["']?$/);
        if (match) {
            const key = match[1].trim();
            const value = match[2].trim();
            process.env[key] = value;
        }
    });
} catch (error) {
    console.log('Could not load .env.local, using existing environment variables');
}

async function clearMessages() {
    try {
        console.log('🗑️  Clearing all messages from database...');

        const result = await sql`DELETE FROM messages`;

        console.log(`✅ Successfully deleted ${result.rowCount} messages`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error clearing messages:', error);
        process.exit(1);
    }
}

clearMessages();
