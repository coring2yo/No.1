import './MyMessagesModal.css';

const MyMessagesModal = ({ onClose, messages, currentUser, onEdit, onDelete }) => {
    const myMessages = messages.filter(msg => msg.author === currentUser);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="my-messages-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>내가 작성한 메시지</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="my-messages-list">
                    {!currentUser ? (
                        <div className="empty-state">
                            <p>IP 주소를 가져오는 중입니다...</p>
                        </div>
                    ) : myMessages.length === 0 ? (
                        <div className="empty-state">
                            <p>작성한 메시지가 없습니다.</p>
                        </div>
                    ) : (
                        myMessages.map((message) => (
                            <div key={message.id} className="message-item">
                                <div className="message-preview">
                                    <div className="message-header-info">
                                        <span className="to-label">To. {message.recipient}</span>
                                    </div>
                                    <p className="message-content" style={{ color: message.color || '#555' }}>
                                        {message.text}
                                    </p>
                                </div>
                                <div className="message-actions">
                                    <button
                                        className="edit-btn-small"
                                        onClick={() => {
                                            onEdit(message);
                                            onClose();
                                        }}
                                    >
                                        수정
                                    </button>
                                    <button
                                        className="delete-btn-small"
                                        onClick={() => onDelete(message.id)}
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyMessagesModal;
