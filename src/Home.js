import React, { useState } from "react";
import "./Home.css";

const UserSelection = ({ onSelectRole }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Pass the role and form data to the parent component
    // onSelectRole("customer", formData);
    setShowPopup(false);
  };

  return (
    <div className="user-selection-container">
      <h1 className="title">Welcome to ChatBot</h1>
      <p className="subtitle">Please select your role to continue:</p>
      <div className="role-buttons">
        <button
          className="role-button customer"
          onClick={() => setShowPopup(true)}
        >
          I am a Customer
        </button>
        <button
          className="role-button business-owner"
          onClick={() => window.location.href = `/chatlist`}
        >
          I am a Business Owner
        </button>
      </div>

      {/* Popup for Customer */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2 className="popup-title">Customer Login</h2>
            <form className="form-class" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div> */}
              <div className="form-actions">
                <button type="submit" className="submit-button"
                  onClick={() => window.location.href = `/${formData.username}`}>
                  Continue
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSelection;
