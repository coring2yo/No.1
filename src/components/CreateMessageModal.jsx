import { useState, useRef, useEffect } from 'react';
import './CreateMessageModal.css';

const COLORS = ['#FFFFFF', '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#C9C9FF', '#E0BBE4'];

const CreateMessageModal = ({ onClose, onSubmit, initialData = null }) => {
    const [recipient, setRecipient] = useState('');
    const [text, setText] = useState('');
    const [color, setColor] = useState(COLORS[0]);
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (initialData) {
            setRecipient(initialData.recipient || '');
            setText(initialData.text || '');
            setColor(initialData.color || COLORS[0]);
            setImage(initialData.image || null);
        }
    }, [initialData]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim() || !recipient.trim()) return;

        const messageData = {
            id: initialData ? initialData.id : Date.now(),
            text,
            recipient,
            author: initialData?.author || '', // Will be replaced with IP in App.jsx
            color,
            image,
            timestamp: initialData ? initialData.timestamp : Date.now(),
        };

        onSubmit(messageData);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{initialData ? '메시지 수정' : '새 메시지 작성'}</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>To. (받는 사람)</label>
                        <input
                            type="text"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            placeholder="받는 사람 이름"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>메시지</label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="하고 싶은 말을 남겨주세요..."
                            rows={4}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>텍스트 색상</label>
                        <div className="color-picker">
                            {COLORS.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    className={`color-circle ${color === c ? 'selected' : ''}`}
                                    style={{ backgroundColor: c }}
                                    onClick={() => setColor(c)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>사진 (선택)</label>
                        <div
                            className="image-upload-box"
                            onClick={() => fileInputRef.current.click()}
                        >
                            {image ? (
                                <img src={image} alt="preview" className="image-preview" />
                            ) : (
                                <span>📷 사진 추가하기</span>
                            )}
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            hidden
                        />
                        {image && (
                            <button
                                type="button"
                                className="remove-image-btn"
                                onClick={(e) => { e.stopPropagation(); setImage(null); }}
                            >
                                사진 삭제
                            </button>
                        )}
                    </div>

                    <div className="modal-actions">
                        <button type="submit" className="submit-btn">{initialData ? '수정하기' : '등록하기'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateMessageModal;
