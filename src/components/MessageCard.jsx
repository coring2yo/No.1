
import './MessageCard.css';

const MessageCard = ({ message, onDelete, onEdit, currentUser }) => {
    const { text, author, image, color } = message;
    const isAuthor = currentUser && currentUser === author;

    return (
        <div className="message-card animate-fade-in">
            <div className="balloon-background">
                <img src="/heart-balloon.png" alt="heart balloon" className="balloon-image" />
            </div>

            {isAuthor && (
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
            )}

            <div className="card-content">
                <p className="recipient" style={{ fontWeight: 'bold', marginBottom: '8px', color: color || '#555' }}>
                    To. {message.recipient || 'Everyone'}
                </p>
                <p className="message-text" style={{ color: color || '#555' }}>{text}</p>

                <div className="card-footer">
                    <span className="author" style={{ color: color || 'rgba(0, 0, 0, 0.5)' }}>From. {author}</span>
                </div>
            </div>
        </div>
    );
};

export default MessageCard;
