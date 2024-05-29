import React, { useState, useEffect, useRef, useCallback } from "react";
import "./ChatBot.css";
import lgoo from "../Assets/logo.png";
const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const chatBoxRef = useRef(null);
  const [socket, setSocket] = useState(null);


  const handleUserInput = useCallback((e) => {
    setUserInput(e.target.value);
  }, []);

  const handleKeyPress = async (e) => {
    if (e.key === "Enter" && userInput.trim()) {
      const newMessage = {
        type: "user",
        text: userInput,
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

      // try {
      //   const response = await fetch("/ask", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ question: userInput }),
      //   });

      //   const data = await response.json();
      //   const botMessage = {
      //     type: "bot",
      //     text: data.response,
      //   };

      //   setMessages((prevMessages) => [botMessage, ...prevMessages]);
      // } catch (error) {
      //   console.error("Error:", error);
      // }

      // setUserInput("");
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
      // newSocket.send(JSON.stringify({ 'message': 'Hello, Server!' }));
    };

    newSocket.onmessage = (event) => {
      console.log("데이터 받음",event.data);
      const data = JSON.parse(event.data);
      console.log('서버로부터 메시지:', data);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          // query: data.Query,
          // answer: data.Answer,
          // answerImageUrl: data.AnswerImageUrl,
          // intent: data.Intent,
          type: "bot",
          message: data.Answer + " 의도: "+ data.Intent 
        },
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
  }, [messages]);

  return (
    <div className="chat-container" ref={chatBoxRef}>
      <div className="chat-header">
        <img src="/logo.png" alt="Logo" />
        <strong>강원동</strong>
      </div>
      <div className="chat-box">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
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
        <img src={lgoo} alt="원동이" />
        <span>원동이</span>
      </div>
    )}
    {message.text}
  </div>
));

export default ChatBot;
