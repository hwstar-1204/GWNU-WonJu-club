import React, { useState, useEffect, useRef, useCallback } from "react";
import "./ChatBot.css";
import logo from "../Main/Main_assets/chatbotlogo.png";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const chatBoxRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const messageIndex = useRef(0); // 메시지 인덱스를 저장하는 ref

  const handleUserInput = useCallback((e) => {
    setUserInput(e.target.value);
  }, []);

  const handleKeyPress = async (e) => {
    if (e.key === "Enter" && userInput.trim()) {
      const newMessage = {
        type: "user",
        text: userInput,
        index: messageIndex.current++ // 메시지 인덱스를 추가하고 증가
      };

      setMessages((prevMessages) => [newMessage, ...prevMessages]);

      // 웹소켓 서버로 메시지 전송
      if (socket) {
        socket.send(JSON.stringify({ 'Query': newMessage.text }));
        console.log(JSON.stringify({ 'Query': newMessage.text }));
        setUserInput("");
      } else {
        console.log('WebSocket 연결이 존재하지 않습니다.');
      }
    }
  };

  useEffect(() => {
    // 스크롤
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }

    const newSocket = new WebSocket('ws://localhost:8000/ws/chat/');

    newSocket.onopen = (event) => {
      console.log('WebSocket 연결이 열렸습니다.');
      newSocket.send(JSON.stringify({ 'Query': '안녕하세요' }));
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('서버로부터 메시지:', data.Answer);
      setMessages((prevMessages) => [
        {
          type: "bot",
          text: data.Answer + " [의도: " + data.Intent + "]",
          index: messageIndex.current++ // 메시지 인덱스를 추가하고 증가
        },
        ...prevMessages
      ]);
    };

    newSocket.onclose = (event) => {
      console.log('WebSocket 연결이 닫혔습니다.');
    };

    newSocket.onerror = (error) => {
      console.log('WebSocket 에러:', error);
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <div className="chat-container" ref={chatBoxRef}>
      <div className="chat-header">
        <img src={logo} alt="Logo" />
        <strong>강원동</strong>
      </div>
      <div className="chat-box">
        {messages.map((message) => (
          <Message key={message.index} message={message} />
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={userInput}
          onChange={handleUserInput}
          onKeyPress={handleKeyPress}
          placeholder="질문을 입력하세요..."
        />
      </div>
    </div>
  );
};

const Message = React.memo(({ message }) => (
  <div className={`chat-message ${message.type}-message`}>
    {message.type === "bot" && (
      <div className="bot-info">
        <img src={logo} alt="원동이" />
        <span>원동이</span>
      </div>
    )}
    {message.text}
  </div>
));

export default ChatBot;
