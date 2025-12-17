import { useState, useEffect } from 'react';
import Board from './components/Board';
import CreateMessageModal from './components/CreateMessageModal';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMessage, setEditingMessage] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Load messages and current user from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('rolling_paper_messages');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load messages', e);
      }
    }

    const savedUser = localStorage.getItem('rolling_paper_current_user');
    if (savedUser) {
      setCurrentUser(savedUser);
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('rolling_paper_messages', JSON.stringify(messages));
  }, [messages]);

  const addMessage = (newMessage) => {
    // Set current user if not already set
    if (!currentUser) {
      setCurrentUser(newMessage.author);
      localStorage.setItem('rolling_paper_current_user', newMessage.author);
    }
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
          currentUser={currentUser}
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
