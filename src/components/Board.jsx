import { useMemo } from 'react';
import MessageCard from './MessageCard';
import './Board.css';

const Board = ({ messages, onDelete, onEdit, currentUser, isPaused }) => {
    // Memoize the random positions to prevent re-calculation on every render
    // unless messages change significantly.
    // Note: If you want truly persistent positions for existing messages when new ones are added,
    // we would need to store this state in the parent or add it to the message object itself.
    // For now, we'll generate it on the fly to keep it simple, but use useMemo to stabilize it slightly.

    const randomizedMessages = useMemo(() => {
        const laneCount = 5;
        const lanes = [15, 32, 50, 68, 85]; // Horizontal positions in %
        const duration = 25; // Consistent speed for all balloons (seconds)
        const verticalSpacing = 8; // Average vertical spacing in seconds

        return messages.map((msg, index) => {
            const laneIndex = index % laneCount;
            const indexInLane = Math.floor(index / laneCount);

            // Calculate delay to space cards vertically within the same lane
            // Add a small random jitter (±1s) to make it look natural but stay separated
            const jitter = (Math.random() * 2) - 1;
            const animationDelay = -(indexInLane * verticalSpacing + jitter);

            return {
                ...msg,
                style: {
                    left: `${lanes[laneIndex]}%`,
                    animationDuration: `${duration}s`,
                    animationDelay: `${animationDelay}s`,
                }
            };
        });
    }, [messages]);

    if (!messages || messages.length === 0) {
        return <div className="board-sky"></div>;
    }

    return (
        <div className={`board-sky ${isPaused ? 'is-paused' : ''}`}>
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
