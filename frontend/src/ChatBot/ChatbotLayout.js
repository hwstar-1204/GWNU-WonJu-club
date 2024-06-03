import React, { useState } from "react";
import ChatBot from "./ChatBot";
import "./ChatbotLayout.css";
import logo from "../Assets/chatbot.png";

const Layout = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="layout-container">
      {children}
      <div className="chat-toggle-button" onClick={toggleChat}>
        {isChatOpen ? "X" : <img src={logo} alt="Open Chat" />}
      </div>
      {isChatOpen && <ChatBot />}
    </div>
  );
};

export default Layout;
