import { useState } from 'react';
import './MyMessagesModal.css';

const MyMessagesModal = ({ onClose, messages, currentUser, onEdit, onDelete }) => {
    const [authorName, setAuthorName] = useState(currentUser || '');
    const [isAuthorSet, setIsAuthorSet] = useState(!!currentUser);

    const myMessages = messages.filter(msg => msg.author === authorName);

    const handleSubmitAuthor = (e) => {
        e.preventDefault();
        if (authorName.trim()) {
            setIsAuthorSet(true);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="my-messages-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>내가 작성한 메시지</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="my-messages-list">
                    {!isAuthorSet ? (
                        <div className="author-input-container">
                            <p style={{ marginBottom: '16px', color: '#666' }}>작성자 이름을 입력하세요</p>
                            <form onSubmit={handleSubmitAuthor}>
                                <input
                                    type="text"
                                    value={authorName}
                                    onChange={(e) => setAuthorName(e.target.value)}
                                    placeholder="작성자 이름"
                                    className="author-input"
                                    autoFocus
                                />
                                <button type="submit" className="author-submit-btn">확인</button>
                            </form>
                        </div>
                    ) : myMessages.length === 0 ? (
                        <div className="empty-state">
                            <p>작성한 메시지가 없습니다.</p>
                            <button
                                className="change-author-btn"
                                onClick={() => setIsAuthorSet(false)}
                            >
                                다른 이름으로 조회
                            </button>
                        </div>
                    ) : (
                        myMessages.map((message) => (
                            <div key={message.id} className="message-item">
                                <div className="message-preview">
                                    <div className="message-header-info">
                                        <span className="to-label">To. {message.recipient}</span>
                                        <span className="date">
                                            {new Date(message.timestamp).toLocaleDateString('ko-KR')}
                                        </span>
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
                                        ✏️ 수정
                                    </button>
                                    <button
                                        className="delete-btn-small"
                                        onClick={() => {
                                            if (window.confirm('정말 삭제하시겠습니까?')) {
                                                onDelete(message.id);
                                            }
                                        }}
                                    >
                                        🗑️ 삭제
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
