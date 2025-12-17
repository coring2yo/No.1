import { NextResponse } from 'next/server';
import { updateMessage, deleteMessage } from '@/lib/db';

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();
        const message = await updateMessage(parseInt(id), body);

        if (!message) {
            return NextResponse.json(
                { error: 'Message not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(message);
    } catch (error) {
        console.error('PUT /api/messages/[id] error:', error);
        return NextResponse.json(
            { error: 'Failed to update message' },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        await deleteMessage(parseInt(id));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('DELETE /api/messages/[id] error:', error);
        return NextResponse.json(
            { error: 'Failed to delete message' },
            { status: 500 }
        );
    }
}
