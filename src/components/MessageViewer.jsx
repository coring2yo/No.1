import { createPortal } from 'react-dom';
import './MessageViewer.css';

const MessageViewer = ({ message, onClose }) => {
    const { text, recipient, display_name, author, image, color } = message;

    // 텍스트 색상이 하얀색(#FFFFFF)인 경우 확대했을 때 분홍색(#FF69B4)으로 보이도록 조정
    const displayColor = (color && color.toUpperCase() === '#FFFFFF') ? '#FF69B4' : color;

    return createPortal(
        <div className="message-viewer-overlay" onClick={onClose}>
            <div className="message-viewer-content glass-panel" onClick={(e) => e.stopPropagation()}>
                <button className="message-viewer-close" onClick={onClose}>&times;</button>

                <div className="viewer-card-body">
                    <div className="viewer-recipient" style={{ color: displayColor || '#ff69b4' }}>
                        To. {recipient || 'Everyone'}
                    </div>

                    {image && (
                        <div className="viewer-image-container">
                            <img src={image} alt="uploaded" className="viewer-image" />
                        </div>
                    )}

                    <div className="viewer-text" style={{ color: displayColor || '#333' }}>
                        {text}
                    </div>

                    <div className="viewer-footer">
                        <span className="viewer-author" style={{ color: displayColor || '#888' }}>
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
