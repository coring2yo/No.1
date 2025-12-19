import { useState } from 'react';
import './MessageCard.css';
import MessageViewer from './MessageViewer';

const MessageCard = ({ message, onDelete, onEdit, currentUser }) => {
    const { text, author, image, color } = message;
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    const handleCardClick = () => {
        setIsViewerOpen(true);
    };

    return (
        <>
            <div className="message-card animate-fade-in" onClick={handleCardClick}>
                <div className="balloon-background">
                    <img src="/heart-balloon.png" alt="heart balloon" className="balloon-image" />
                </div>

                <div className="card-content">
                    <p className="recipient" style={{ fontWeight: 'bold', marginBottom: '24px', color: color || '#2C3E50' }}>
                        To. {message.recipient || 'Everyone'}
                    </p>

                    <div className="card-footer">
                        <span className="author" style={{ color: color || 'rgba(0, 0, 0, 0.5)' }}>From. {message.display_name || author}</span>
                    </div>
                </div>
            </div>

            {isViewerOpen && (
                <MessageViewer
                    message={message}
                    onClose={() => setIsViewerOpen(false)}
                />
            )}
        </>
    );
};

export default MessageCard;
