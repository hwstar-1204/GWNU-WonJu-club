// import React, { useEffect, useState } from 'react';
// import './ChatbotPage.css';

// const ChatbotPage = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const newSocket = new WebSocket('ws://localhost:8000/ws/chat/');

//     newSocket.onopen = (event) => {
//       console.log('WebSocket 연결이 열렸습니다.');
//       newSocket.send(JSON.stringify({ 'message': 'Hello, Server!' }));
//     };

//     newSocket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log('서버로부터 메시지:', data.answer_text);
//       setMessages((prevMessages) => [...prevMessages, data.answer_text]);
//     };

//     newSocket.onclose = (event) => {
//       console.log('WebSocket 연결이 닫혔습니다.');
//     };

//     newSocket.onerror = (error) => {
//       console.log('WebSocket 에러:', error);
//     };

//     setSocket(newSocket);

//     return () => {
//       newSocket.close();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (socket) {
//         const trimmedMessage = inputValue+ ' '; // 줄 바꿈 문자 제거
//         socket.send(JSON.stringify({ 'Query': trimmedMessage }));
//         console.log(JSON.stringify({ 'Query': trimmedMessage }));
//         setInputValue('');
//     } else {
//       console.log('WebSocket 연결이 존재하지 않습니다.');
//     }
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter' && !event.shiftKey) {
//       event.preventDefault(); // 기본 Enter 키 동작 방지
//       sendMessage();
//     }
//   };

//   return (
//     <div>

//       <div>
//         <textarea 
//           value={inputValue} 
//           onChange={(e) => setInputValue(e.target.value)} 
//           onKeyDown={handleKeyDown}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//       <div>
//         <h2>Messages:</h2>
//         <ul>
//           {messages.map((message, index) => (
//             <li key={index}>{message}</li>
//           ))}
//         </ul>
//       </div>


//       {/* <div id="chat-container">
//         <div id="chat-messages"></div>
        
//             <input type="text" id="message-input" placeholder="메시지를 입력하세요"></input>
//             <button id="send-btn">보내기</button>
//         </div> */}
//     </div>
    
//   );
// }

// export default ChatbotPage;











// import React, { useState, useEffect, useRef, useCallback } from "react";
// import "./ChatbotPage.css";

// const ChatBotPage = () => {
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState("");
//   const chatBoxRef = useRef(null);

//   const handleUserInput = useCallback((e) => {
//     setUserInput(e.target.value);
//   }, []);

//   const handleKeyPress = async (e) => {
//     if (e.key === "Enter" && userInput.trim()) {
//       const newMessage = {
//         type: "user",
//         text: userInput,
//       };

//       setMessages((prevMessages) => [newMessage, ...prevMessages]);

//       try {
//         const response = await fetch("/ask", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ question: userInput }),
//         });

//         const data = await response.json();
//         const botMessage = {
//           type: "bot",
//           text: data.response,
//         };

//         setMessages((prevMessages) => [
//           botMessage,
//           newMessage,
//           ...prevMessages,
//         ]);
//       } catch (error) {
//         console.error("Error:", error);
//       }

//       setUserInput("");
//     }
//   };

//   useEffect(() => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//     }
//   }, [messages]);

//   return (
//     <div className="chat-container">
//       <div className="chat-header">
//         <img src="/static/images/logo.png" alt="Logo" />
//         <strong>강원동</strong>
//       </div>
//       <div className="chat-box" ref={chatBoxRef}>
//         {messages.map((message, index) => (
//           <Message key={index} message={message} />
//         ))}
//       </div>
//       <div className="chat-input">
//         <input
//           type="text"
//           value={userInput}
//           onChange={handleUserInput}
//           onKeyPress={handleKeyPress}
//           placeholder="질문을 입력하세요..."
//         />
//       </div>
//     </div>
//   );
// };

// const Message = React.memo(({ message }) => (
//   <div className={`chat-message ${message.type}-message`}>
//     {message.type === "bot" && (
//       <div className="bot-info">
//         <img src="/static/images/gangwondong.png" alt="원동이" />
//         <span>원동이</span>
//       </div>
//     )}
//     {message.text}
//   </div>
// ));

// export default ChatBotPage;








import React, { useEffect, useState } from 'react';
import './ChatbotPage.css';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8000/ws/chat/');

    newSocket.onopen = (event) => {
      console.log('WebSocket 연결이 열렸습니다.');
      newSocket.send(JSON.stringify({ 'message': 'Hello, Server!' }));
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

  const sendMessage = () => {
    if (socket) {
      const trimmedMessage = inputValue + ' '; // 줄 바꿈 문자 제거
      socket.send(JSON.stringify({ 'Query': trimmedMessage }));
      console.log(JSON.stringify({ 'Query': trimmedMessage }));
      setInputValue('');
    } else {
      console.log('WebSocket 연결이 존재하지 않습니다.');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // 기본 Enter 키 동작 방지
      sendMessage();
    }
  };

  return (
    <div>
      <div>
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage}>Send</button>
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