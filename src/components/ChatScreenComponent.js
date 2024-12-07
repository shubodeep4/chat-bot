import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import db from "../firebase";
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  orderBy,
  setDoc,
  addDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import "./ChatScreenComponent.css";

const ChatScreenComponent = () => {
  const { username } = useParams();
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false); 
  const [otherTyping, setOtherTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const isBusinessOwner =
    new URLSearchParams(location.search).get("businessOwner") === "true";
  const messagesEndRef = useRef(null);
  const typingIndicatorRef = useRef(null);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const userDocRef = doc(db, "users", username);
        const userSnap = await getDocs(
          query(collection(db, "users"), where("username", "==", username))
        );

        if (userSnap.empty) {
          await setDoc(userDocRef, {
            username,
            businessOwnerTyping: false,
            businessOwnerTime: null,
            customerTyping: false,
            customerTime: null,
          });
        }

        const chatQuery = query(
          collection(db, "chats"),
          where("username", "==", username),
          orderBy("timestamp", "asc")
        );

        const unsubscribeMessages = onSnapshot(chatQuery, (snapshot) => {
          const chatMessages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMessages(chatMessages);
        });

        const typingRef = doc(db, "users", username);
        const unsubscribeTyping = onSnapshot(typingRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (isBusinessOwner) {
              setOtherTyping(data.customerTyping);
            } else {
              setOtherTyping(data.businessOwnerTyping);
            }
          }
        });

        return () => {
          unsubscribeMessages();
          unsubscribeTyping();
        };
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };

    initializeChat();
  }, [username, isBusinessOwner]);

  const handleTyping = async (typing) => {
    try {
      const typingField = isBusinessOwner ? "businessOwnerTyping" : "customerTyping";
      const timeField = isBusinessOwner ? "businessOwnerTime" : "customerTime";

      const userDocRef = doc(db, "users", username);

      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      if (typing) {
        await updateDoc(userDocRef, {
          [typingField]: true,
          [timeField]: new Date(),
        });

        const timeout = setTimeout(() => {
          handleTyping(false);
        }, 5000); 
        setTypingTimeout(timeout);
      } else {
        await updateDoc(userDocRef, {
          [typingField]: false,
          [timeField]: null,
        });
      }
    } catch (error) {
      console.error("Error updating typing indicator:", error);
    }
  };

  const handleSend = async () => {
    if (newMessage.trim()) {
      const newMessageData = {
        username,
        sender: isBusinessOwner ? "business owner" : username,
        text: newMessage,
        timestamp: new Date(),
      };

      try {
        await addDoc(collection(db, "chats"), newMessageData);
        setNewMessage(""); 
        handleTyping(false);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (typingIndicatorRef.current && otherTyping) {
      typingIndicatorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, otherTyping]);

  return (
    <div className="chat-screen-container">
      <h1 className="chat-screen-header">
  Chat with {isBusinessOwner ? "Customer" : "Business Owner"}
</h1>

      <div className="chat-screen-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === "business owner"
                ? isBusinessOwner
                  ? "chat-business-owner"
                  : "chat-user"
                : isBusinessOwner
                ? "chat-user"
                : "chat-business-owner"
            }`}
          >
            <p>{msg.text}</p>
          </div>
        ))}

        {/* Typing indicator message */}
        {otherTyping && (
          <div className="chat-typing-indicator" ref={typingIndicatorRef}>
            {isBusinessOwner
              ? `${username} is typing...`
              : "Business Owner is typing..."}
          </div>
        )}

        <div ref={messagesEndRef}></div>
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            handleTyping(true);
          }}
          onBlur={() => handleTyping(false)}
          className="chat-input"
        />
        <button onClick={handleSend} className="chat-send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatScreenComponent;
