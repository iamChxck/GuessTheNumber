import React, { useState, useEffect, useRef } from 'react';
import MessageModel from '../model/MessageModel';
import ChatBoxObj from '../objects/ChatBoxObj';

interface ChatBoxProps {
  playerName: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ playerName }) => {
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [messageInput, setInput] = useState('');
  const serverAddress: string = 'ws://localhost:8080';

  const webSocket = useRef<WebSocket | null>(null);

  const chatBoxObj: ChatBoxObj = new ChatBoxObj(messageInput, playerName, setInput, webSocket);

  useEffect(() => {
    webSocket.current = new WebSocket(serverAddress);

    webSocket.current.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    webSocket.current.onmessage = async (event: MessageEvent) => {
      try {
        const data = await event.data.text();
        const newMessage: MessageModel = JSON.parse(data);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    webSocket.current.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      webSocket.current?.close();
    };
  }, []);

  return (
    <div className="flex flex-col w-[600px] h-[300px]">
      <div className="flex-1 overflow-y-auto bg-gray-800 rounded-lg shadow-lg p-4">
        {messages.map((message, index) => (
          <div key={index} className="mb-2">
            <span className="font-bold text-white">{message.sender}:</span>
            <span className="text-white"> {message.text}</span>
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={chatBoxObj.handleKeyPress}
          className="flex-1 p-2 bg-gray-700 text-white rounded-l-lg"
          placeholder="Type your message..."
        />
        <button
          onClick={chatBoxObj.sendMessage}
          className="p-2 bg-blue-500 text-white rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
