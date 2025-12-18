import './ImageViewer.css';

const ImageViewer = ({ image, onClose }) => {
    return (
        <div className="image-viewer-overlay" onClick={onClose}>
            <div className="image-viewer-content">
                <button className="image-viewer-close" onClick={onClose}>&times;</button>
                <img src={image} alt="확대 이미지" className="image-viewer-img" onClick={onClose} />
            </div>
        </div>
    );
};

export default ImageViewer;
