import { useMemo } from 'react';
import MessageCard from './MessageCard';
import './Board.css';

const Board = ({ messages }) => {
    // Memoize the random positions to prevent re-calculation on every render
    // unless messages change significantly.
    // Note: If you want truly persistent positions for existing messages when new ones are added,
    // we would need to store this state in the parent or add it to the message object itself.
    // For now, we'll generate it on the fly to keep it simple, but use useMemo to stabilize it slightly.

    const randomizedMessages = useMemo(() => {
        return messages.map((msg) => ({
            ...msg,
            style: {
                left: `${Math.random() * 80 + 5}%`, // Random position 5% to 85%
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
                    <MessageCard message={msg} />
                </div>
            ))}
        </div>
    );
};

export default Board;
