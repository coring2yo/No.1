import { useMemo, useState, useRef } from 'react';
import MessageCard from './MessageCard';
import './Board.css';

const Board = ({ messages, onDelete, onEdit, currentUser, isPaused }) => {
    const [draggedCard, setDraggedCard] = useState(null);
    const [cardPositions, setCardPositions] = useState({});
    const dragStartPos = useRef({ x: 0, y: 0 });
    const cardStartPos = useRef({ x: 0, y: 0 });
    const hasDragged = useRef(false);

    const randomizedMessages = useMemo(() => {
        const laneCount = 5;
        const lanes = [10, 27.5, 45, 62.5, 80];
        const duration = 45; // 경쾌한 속도 유지 (그리팅 카드의 감성에 적합)

        // 애니메이션 이동 거리 (-300vh)를 기반으로 픽셀 속도 계산
        // 100vh를 약 1000px로 가정하면 3000px / 45s = 약 67px/s
        const pixelSpeed = 67;

        // 각 레인의 누적 지연 시간을 관리
        const laneCumulativeDelay = [0, 0, 0, 0, 0];

        // 메시지를 ID 순으로 정렬하여 안정적인 렌더링 순서 확보
        const stableMessages = [...messages].sort((a, b) => (a.id || 0) - (b.id || 0));

        return stableMessages.map((msg) => {
            // 메시지 가로 위치 결정 (5개 레인 기반, 지터 제거하여 겹침 방지)
            const laneIndex = (msg.id || 0) % laneCount;
            const leftPosition = lanes[laneIndex];

            // 1. 메시지의 예상 높이(px) 계산
            const textLength = msg.text?.length || 0;
            const newlineCount = (msg.text?.split('\n').length || 1) - 1;
            const lineCount = Math.ceil(textLength / 18) + newlineCount;
            const textHeight = lineCount * 28; // 줄당 약 28px
            const imageHeight = msg.image ? 300 : 0; // 이미지 있으면 약 300px 추가
            const paddingHeight = 250; // 하트 풍선 상하 여백 및 푸터
            const totalEstimatedHeight = textHeight + imageHeight + paddingHeight;

            // 2. 이 높이를 애니메이션 시간(초)으로 변환
            // 텍스트 길이에 비례하여 안전 마진을 동적으로 증가
            // 기본 마진 300px + 텍스트 길이당 추가 마진 (100자당 100px)
            const baseSafetyMargin = 300;
            const dynamicMargin = Math.floor(textLength / 100) * 100;
            const totalSafetyMargin = baseSafetyMargin + dynamicMargin;

            const timeNeeded = (totalEstimatedHeight + totalSafetyMargin) / pixelSpeed;

            // 3. 해당 레인의 현재 딜레이를 가져오고, 이번 메시지만큼 다음 딜레이를 누적
            const currentDelay = laneCumulativeDelay[laneIndex];
            laneCumulativeDelay[laneIndex] += timeNeeded;

            const animationDelay = -currentDelay;

            return {
                ...msg,
                style: {
                    left: `${leftPosition}%`,
                    animationDuration: `${duration}s`,
                    animationDelay: `${animationDelay}s`,
                }
            };
        });
    }, [messages]);

    const handleMouseDown = (e, msgId) => {
        // 버튼이나 클릭 가능한 요소는 드래그 방지
        if (e.target.closest('button') || e.target.closest('a')) {
            return;
        }

        hasDragged.current = false;
        setDraggedCard(msgId);
        dragStartPos.current = { x: e.clientX, y: e.clientY };

        const currentPos = cardPositions[msgId] || { x: 0, y: 0 };
        cardStartPos.current = currentPos;
    };

    const handleMouseMove = (e) => {
        if (!draggedCard) return;

        const deltaX = e.clientX - dragStartPos.current.x;
        const deltaY = e.clientY - dragStartPos.current.y;

        // 5px 이상 움직였을 때만 드래그로 간주
        if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
            hasDragged.current = true;
        }

        setCardPositions(prev => ({
            ...prev,
            [draggedCard]: {
                x: cardStartPos.current.x + deltaX,
                y: cardStartPos.current.y + deltaY
            }
        }));
    };

    const handleMouseUp = (e) => {
        if (hasDragged.current) {
            // 드래그했으면 클릭 이벤트 방지
            e.preventDefault();
            e.stopPropagation();
        }
        setDraggedCard(null);
        hasDragged.current = false;
    };

    if (!messages || messages.length === 0) {
        return <div className="board-sky"></div>;
    }

    return (
        <div
            className={`board-sky ${isPaused ? 'is-paused' : ''}`}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {randomizedMessages.map((msg) => {
                const position = cardPositions[msg.id] || { x: 0, y: 0 };
                const isDragging = draggedCard === msg.id;

                return (
                    <div
                        key={msg.id}
                        className={`floating-item ${isDragging ? 'dragging' : ''}`}
                        style={{
                            ...msg.style,
                            transform: `translate(calc(-50% + ${position.x}px), ${position.y}px)`,
                            cursor: isDragging ? 'grabbing' : 'grab',
                        }}
                        onMouseDown={(e) => handleMouseDown(e, msg.id)}
                    >
                        <MessageCard
                            message={msg}
                            onDelete={onDelete}
                            onEdit={onEdit}
                            currentUser={currentUser}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default Board;
