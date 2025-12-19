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
        const lanes = [15, 32, 50, 68, 85]; // 5개 레인을 그대로 유지
        const duration = 60; // 속도를 늦추어 더 길고 우아한 이동 (25s -> 60s)
        const verticalSpacing = 45; // 전역 수직 간격을 대폭 확대 (20s -> 45s)

        return messages.map((msg, index) => {
            const laneIndex = index % laneCount;
            const indexInLane = Math.floor(index / laneCount);

            // 수직 간격을 일정하게 유지하여 겹침 방지
            const animationDelay = -(indexInLane * verticalSpacing);

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
