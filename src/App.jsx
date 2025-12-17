import { useState, useEffect } from 'react';
import Board from './components/Board';
import CreateMessageModal from './components/CreateMessageModal';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load messages from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('rolling_paper_messages');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load messages', e);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('rolling_paper_messages', JSON.stringify(messages));
  }, [messages]);

  const addMessage = (newMessage) => {
    setMessages((prev) => [newMessage, ...prev]);
  };

  return (
    <div className="app-container">
      <header className="app-header glass-panel">
        <h1>1인 창업가 개발부트캠프 No.1기의 소중한 Rolling Paper</h1>
        <button
          className="add-btn"
          onClick={() => setIsModalOpen(true)}
        >
          + 메시지 남기기
        </button>
      </header>

      <main className="main-board">
        <Board messages={messages} />
      </main>

      {isModalOpen && (
        <CreateMessageModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={addMessage}
        />
      )}
    </div>
  );
}

export default App;
