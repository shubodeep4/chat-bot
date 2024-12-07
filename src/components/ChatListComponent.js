import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";
import "./ChatListComponent.css";

const ChatListComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = querySnapshot.docs.map((doc) => doc.data().username);
        setUsers(usersList); 
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h1 className="header">Customer List</h1>
      <ul className="list">
        {users.map((user, index) => (
          <li key={index} className="list-item">
            <Link to={`/${user}?businessOwner=true`} className="link">
              {user}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatListComponent;
