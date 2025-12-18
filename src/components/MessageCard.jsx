import { useState } from 'react';
import './MessageCard.css';
import ImageViewer from './ImageViewer';

const MessageCard = ({ message, onDelete, onEdit, currentUser }) => {
    const { text, author, image, color } = message;
    const isAuthor = currentUser && currentUser === author;
    const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

    return (
        <>
            <div className="message-card animate-fade-in">
                <div className="balloon-background">
                    <img src="/heart-balloon.png" alt="heart balloon" className="balloon-image" />
                </div>

                <div className="card-content">
                    <p className="recipient" style={{ fontWeight: 'bold', marginBottom: '8px', color: color || '#555' }}>
                        To. {message.recipient || 'Everyone'}
                    </p>

                    {image && (
                        <div className="message-image-container" onClick={() => setIsImageViewerOpen(true)}>
                            <img src={image} alt="uploaded" className="message-image" />
                        </div>
                    )}

                    <p className="message-text" style={{ color: color || '#555' }}>{text}</p>

                    <div className="card-footer">
                        <span className="author" style={{ color: color || 'rgba(0, 0, 0, 0.5)' }}>From. {message.display_name || author}</span>
                    </div>
                </div>
            </div>

            {isImageViewerOpen && (
                <ImageViewer
                    image={image}
                    onClose={() => setIsImageViewerOpen(false)}
                />
            )}
        </>
    );
};

export default MessageCard;
