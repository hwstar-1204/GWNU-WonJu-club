import React, { useEffect, useState } from 'react';
import './ChatbotPage.css';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [socket, setSocket] = useState(null);
  // const [sendingMessage, setSendingMessage] = useState(false); // 메시지 전송 중 여부


  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8000/ws/chat/');

    newSocket.onopen = (event) => {
      console.log('WebSocket 연결이 열렸습니다.');
      // newSocket.send(JSON.stringify({ 'message': 'Hello, Server!' }));
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('서버로부터 메시지:', data);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          query: data.Query,
          answer: data.Answer,
          answerImageUrl: data.AnswerImageUrl,
          intent: data.Intent,
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
  }, []);


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') { //  && !event.shiftKey
      event.preventDefault(); // 기본 Enter 키 동작 방지
      sendMessage();
    }
  };
  
  const handleSendMessage = () => {
    sendMessage();
  };

  const sendMessage = () => {
      if (socket) {
        const trimmedMessage = (inputValue || '').trim(); // 줄 바꿈 문자 제거
        socket.send(JSON.stringify({ 'Query': trimmedMessage }));
        // console.log(JSON.stringify({ 'Query': trimmedMessage }));
        setInputValue('');
      } else {
        console.log('WebSocket 연결이 존재하지 않습니다.');
      }
  };



  return (
    <div>
      <div>
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          // onKeyDown={handleKeyDown}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      <div>
        <h2>Messages:</h2>
        <ul>
        {messages.length > 0 &&
            messages.map((message, index) => (
            <li key={index}>
                <p>Query: {message?.query || ''}</p>
                <p>Answer: {message?.answer || ''}</p>
                {message?.answerImageUrl && (
                <img src={message.answerImageUrl} alt="Answer" />
                )}
                <p>Intent: {message?.intent || ''}</p>
            </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatbotPage;