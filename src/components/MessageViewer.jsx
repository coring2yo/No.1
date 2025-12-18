import { createPortal } from 'react-dom';
import './MessageViewer.css';

const MessageViewer = ({ message, onClose }) => {
    const { text, recipient, display_name, author, image, color } = message;

    return createPortal(
        <div className="message-viewer-overlay" onClick={onClose}>
            <div className="message-viewer-content glass-panel" onClick={(e) => e.stopPropagation()}>
                <button className="message-viewer-close" onClick={onClose}>&times;</button>

                <div className="viewer-card-body">
                    <div className="viewer-recipient" style={{ color: color || '#ff69b4' }}>
                        To. {recipient || 'Everyone'}
                    </div>

                    {image && (
                        <div className="viewer-image-container">
                            <img src={image} alt="uploaded" className="viewer-image" />
                        </div>
                    )}

                    <div className="viewer-text" style={{ color: color || '#333' }}>
                        {text}
                    </div>

                    <div className="viewer-footer">
                        <span className="viewer-author" style={{ color: color || '#888' }}>
                            From. {display_name || author}
                        </span>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default MessageViewer;
