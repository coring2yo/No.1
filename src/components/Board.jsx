import { useMemo } from 'react';
import MessageCard from './MessageCard';
import './Board.css';

const Board = ({ messages, onDelete, onEdit }) => {
    // Memoize the random positions to prevent re-calculation on every render
    // unless messages change significantly.
    // Note: If you want truly persistent positions for existing messages when new ones are added,
    // we would need to store this state in the parent or add it to the message object itself.
    // For now, we'll generate it on the fly to keep it simple, but use useMemo to stabilize it slightly.

    const randomizedMessages = useMemo(() => {
        return messages.map((msg) => ({
            ...msg,
            style: {
                left: `max(20px, calc(${Math.random()} * (100% - 320px)))`, // Ensure it fits within width - 320px (card width + margins)
                animationDuration: `${Math.random() * 15 + 15}s`, // 15-30s duration
                animationDelay: `-${Math.random() * 20}s`, // Start at random points in the cycle
            }
        }));
    }, [messages]);

    if (!messages || messages.length === 0) {
        return (
            <div className="empty-board">
                <p>아직 메시지가 없어요. 첫 번째 풍선을 띄워보세요! 🎈</p>
            </div>
        );
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
                    />
                </div>
            ))}
        </div>
    );
};

export default Board;
