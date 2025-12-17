import './MessageCard.css';

const MessageCard = ({ message }) => {
    const { text, author, image, color, timestamp } = message;

    return (
        <div
            className="message-card animate-fade-in"
            style={{ backgroundColor: color || '#fff' }}
        >
            {image && (
                <div className="card-image">
                    <img src={image} alt="attached" />
                </div>
            )}

            <div
                className="bubble-tail"
                style={{ borderTopColor: color || '#fff' }}
            ></div>

            <div className="card-content">
                <p className="recipient" style={{ fontWeight: 'bold', marginBottom: '8px', color: '#555' }}>
                    To. {message.recipient || 'Everyone'}
                </p>
                <p className="message-text">{text}</p>

                <div className="card-footer">
                    <span className="author">From. {author}</span>
                    <span className="date">
                        {new Date(timestamp).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MessageCard;
