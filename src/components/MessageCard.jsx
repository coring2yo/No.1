import './MessageCard.css';

const MessageCard = ({ message, onDelete, onEdit }) => {
    const { text, author, image, color, timestamp } = message;

    return (
        <div
            className="message-card animate-fade-in"
            style={{ backgroundColor: color || '#fff' }}
        >
            <div className="card-actions">
                <button
                    className="action-btn edit-btn"
                    onClick={(e) => { e.stopPropagation(); onEdit(message); }}
                    title="수정"
                >
                    ✏️
                </button>
                <button
                    className="action-btn delete-btn"
                    onClick={(e) => { e.stopPropagation(); onDelete(message.id); }}
                    title="삭제"
                >
                    🗑️
                </button>
            </div>

            {image && (
                <div className="card-image">
                    <img src={image} alt="attached" />
                </div>
            )}

            <div
                className="bubble-tail"
                style={{ borderTopColor: color || '#fff' }}
            ></div>

            <div className="card-content">
                <p className="recipient" style={{ fontWeight: 'bold', marginBottom: '8px', color: '#555' }}>
                    To. {message.recipient || 'Everyone'}
                </p>
                <p className="message-text">{text}</p>

                <div className="card-footer">
                    <span className="author">From. {author}</span>
                </div>
            </div>
        </div>
    );
};

export default MessageCard;
