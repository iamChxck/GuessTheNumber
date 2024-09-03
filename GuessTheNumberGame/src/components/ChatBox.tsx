import React, { useState, useEffect, useRef } from 'react';
import PlayerData from '../model/PlayerModel';

interface Message {
  sender: string;
  text: string;
}

interface ChatBoxProps {
  playerName: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ playerName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const serverAddress: string = 'ws://localhost:8080';

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(serverAddress);

    ws.current.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.current.onmessage = async (event: MessageEvent) => {
      try {
        const data = await event.data.text();
        const newMessage: Message = JSON.parse(data);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    ws.current.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() !== '') {
      const message: Message = { sender: playerName, text: input };
      ws.current?.send(JSON.stringify(message));
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

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
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 p-2 bg-gray-700 text-white rounded-l-lg"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-blue-500 text-white rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
