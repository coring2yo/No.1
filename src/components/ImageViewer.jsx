import { createPortal } from 'react-dom';
import './ImageViewer.css';

const ImageViewer = ({ image, onClose }) => {
    return createPortal(
        <div className="image-viewer-overlay" onClick={onClose}>
            <div className="image-viewer-content" onClick={(e) => e.stopPropagation()}>
                <button className="image-viewer-close" onClick={onClose}>&times;</button>
                <img src={image} alt="확대 이미지" className="image-viewer-img" />
            </div>
        </div>,
        document.body
    );
};

export default ImageViewer;

