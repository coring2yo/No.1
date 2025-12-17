import { useState, useRef } from 'react';
import './CreateMessageModal.css';

const COLORS = ['#ffffff', '#fff3cd', '#d4edda', '#f8d7da', '#d1ecf1', '#e2e3e5'];

const CreateMessageModal = ({ onClose, onSubmit }) => {
    const [recipient, setRecipient] = useState('');
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');
    const [color, setColor] = useState(COLORS[0]);
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);

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
        if (!text.trim() || !author.trim() || !recipient.trim()) return;

        const newMessage = {
            id: Date.now(),
            text,
            recipient,
            author,
            color,
            image,
            timestamp: Date.now(),
        };

        onSubmit(newMessage);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>새 메시지 작성</h2>
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
                        <label>From. (보내는 사람)</label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="보내는 사람 이름"
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
                        <label>배경 색상</label>
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
                        <button type="submit" className="submit-btn">등록하기</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateMessageModal;
