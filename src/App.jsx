import { useState, useEffect } from 'react';
import Board from './components/Board';
import CreateMessageModal from './components/CreateMessageModal';
import MyMessagesModal from './components/MyMessagesModal';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMyMessagesModalOpen, setIsMyMessagesModalOpen] = useState(false);
  const [editingMessage, setEditingMessage] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load messages from API and get user's IP address
  useEffect(() => {
    fetchMessages();
    fetchUserIP();
  }, []);

  const fetchUserIP = async () => {
    try {
      const response = await fetch('/api/get-ip');
      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data.ip);
      }
    } catch (err) {
      console.error('Error fetching IP:', err);
    }
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/messages');
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      setMessages(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('메시지를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const addMessage = async (newMessage) => {
    try {
      // Use IP address as author
      const messageWithIP = {
        ...newMessage,
        author: currentUser || newMessage.author
      };

      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageWithIP),
      });

      if (!response.ok) throw new Error('Failed to create message');

      const createdMessage = await response.json();
      setMessages((prev) => [createdMessage, ...prev]);
    } catch (err) {
      console.error('Error creating message:', err);
      alert('메시지 생성에 실패했습니다.');
    }
  };

  const updateMessage = async (updatedMessage) => {
    try {
      const response = await fetch(`/api/messages/${updatedMessage.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedMessage),
      });

      if (!response.ok) throw new Error('Failed to update message');

      const updated = await response.json();
      setMessages((prev) => prev.map(msg => msg.id === updated.id ? updated : msg));
    } catch (err) {
      console.error('Error updating message:', err);
      alert('메시지 수정에 실패했습니다.');
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete message');

      setMessages((prev) => prev.filter(msg => msg.id !== id));
    } catch (err) {
      console.error('Error deleting message:', err);
      alert('메시지 삭제에 실패했습니다.');
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

  if (loading) {
    return (
      <div className="app-container">
        <div style={{ textAlign: 'center', padding: '60px', color: '#fff' }}>
          로딩 중...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div style={{ textAlign: 'center', padding: '60px', color: '#fff' }}>
          {error}
          <br />
          <button onClick={fetchMessages} style={{ marginTop: '20px' }}>
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header glass-panel">
        <h1>1인 창업가 개발부트캠프 No.1기의 소중한 Balloon Paper</h1>
        <div className="header-buttons">
          <button
            className="add-btn"
            onClick={handleOpenCreateModal}
          >
            + 메시지 남기기
          </button>
          <button
            className="my-messages-btn"
            onClick={() => setIsMyMessagesModalOpen(true)}
          >
            내 메시지
          </button>
        </div>
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

      {isMyMessagesModalOpen && (
        <MyMessagesModal
          onClose={() => setIsMyMessagesModalOpen(false)}
          messages={messages}
          currentUser={currentUser}
          onEdit={handleOpenEditModal}
          onDelete={deleteMessage}
        />
      )}
    </div>
  );
}

export default App;
