import { useMemo } from 'react';
import MessageCard from './MessageCard';
import './Board.css';

const Board = ({ messages, onDelete, onEdit, currentUser }) => {
    // Memoize the random positions to prevent re-calculation on every render
    // unless messages change significantly.
    // Note: If you want truly persistent positions for existing messages when new ones are added,
    // we would need to store this state in the parent or add it to the message object itself.
    // For now, we'll generate it on the fly to keep it simple, but use useMemo to stabilize it slightly.

    const randomizedMessages = useMemo(() => {
        return messages.map((msg, index) => {
            // Distribute cards randomly across the full width
            // Use 15% to 85% range to prevent cards from being cut off at edges
            // This accounts for the card width (400px) and translateX(-50%)
            const leftPosition = 15 + (Math.random() * 70); // 15% to 85%

            return {
                ...msg,
                style: {
                    left: `${leftPosition}%`,
                    animationDuration: `${Math.random() * 15 + 15}s`, // 15-30s duration
                    animationDelay: `-${Math.random() * 20}s`, // Start at random points in the cycle
                }
            };
        });
    }, [messages]);

    if (!messages || messages.length === 0) {
        return <div className="board-sky"></div>;
    }

    return (
        <div className="board-sky">
            {randomizedMessages.map((msg) => (
                <div
                    key={msg.id}
                    className="floating-item"
                    style={msg.style}
                >
                    <MessageCard
                        message={msg}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        currentUser={currentUser}
                    />
                </div>
            ))}
        </div>
    );
};

export default Board;
