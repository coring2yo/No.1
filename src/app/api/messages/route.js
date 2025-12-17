import { NextResponse } from 'next/server';
import { getAllMessages, createMessage, initDatabase } from '@/lib/db';

// Initialize database on first request
let dbInitialized = false;

export async function GET() {
    try {
        if (!dbInitialized) {
            await initDatabase();
            dbInitialized = true;
        }

        const messages = await getAllMessages();
        return NextResponse.json(messages);
    } catch (error) {
        console.error('GET /api/messages error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch messages' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        if (!dbInitialized) {
            await initDatabase();
            dbInitialized = true;
        }

        const body = await request.json();
        const message = await createMessage(body);
        return NextResponse.json(message, { status: 201 });
    } catch (error) {
        console.error('POST /api/messages error:', error);
        return NextResponse.json(
            { error: 'Failed to create message' },
            { status: 500 }
        );
    }
}
