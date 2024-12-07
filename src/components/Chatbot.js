import React, { useState } from "react";
import styles from "./Chatbot.css";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages((prev) => [...prev, { sender: "user", text: newMessage }]);
      setNewMessage("");

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "I’m here to assist you with anything you need!" },
        ]);
      }, 1000);
    }
  };

  useEffect(() => {
    const chatContainer = document.getElementById("chatMessages");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <h2>ChatBot</h2>
        <p>How can I assist you today?</p>
      </div>

      <div className={styles.chatMessages} id="chatMessages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              msg.sender === "bot" ? styles.bot : styles.user
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className={styles.chatInput}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          aria-label="Type your message"
        />
        <button onClick={handleSend} disabled={!newMessage.trim()}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
