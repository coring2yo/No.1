import { useState, useEffect } from 'react';
import Board from './components/Board';
import CreateMessageModal from './components/CreateMessageModal';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMessage, setEditingMessage] = useState(null);

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

  const updateMessage = (updatedMessage) => {
    setMessages((prev) => prev.map(msg => msg.id === updatedMessage.id ? updatedMessage : msg));
  };

  const deleteMessage = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setMessages((prev) => prev.filter(msg => msg.id !== id));
    }
  };

  const handleOpenCreateModal = () => {
    setEditingMessage(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (message) => {
    setEditingMessage(message);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (messageData) => {
    if (editingMessage) {
      updateMessage(messageData);
    } else {
      addMessage(messageData);
    }
    setIsModalOpen(false); // Close here to avoid prop drilling close logic if not needed, but CreateMessageModal calls onClose. 
    // Wait, CreateMessageModal calls onClose AFTER onSubmit.
    // Actually CreateMessageModal calls onSubmit then onClose.
    // So here I just handle the data. The closing is handled by the modal's internal logic calling the onClose prop.
    // But wait, "onClose={() => setIsModalOpen(false)}" is passed.
  };

  return (
    <div className="app-container">
      <header className="app-header glass-panel">
        <h1>1인 창업가 개발부트캠프 No.1기의 소중한 Rolling Paper</h1>
        <button
          className="add-btn"
          onClick={handleOpenCreateModal}
        >
          + 메시지 남기기
        </button>
      </header>

      <main className="main-board">
        <Board
          messages={messages}
          onDelete={deleteMessage}
          onEdit={handleOpenEditModal}
        />
      </main>

      {isModalOpen && (
        <CreateMessageModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
          initialData={editingMessage}
        />
      )}
    </div>
  );
}

export default App;
