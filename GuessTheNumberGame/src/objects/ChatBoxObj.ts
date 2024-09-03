import React from 'react';
import MessageModel from "../model/MessageModel";

interface ChatBoxObjData {
  messageInput: string;
  playerName: string;
  setInput: (value: string) => void;
  webSocket: React.MutableRefObject<WebSocket | null>;
}

export default class ChatBoxObj implements ChatBoxObjData {
  constructor(
    public messageInput: string, 
    public playerName: string, 
    public setInput: (value: string) => void,
    public webSocket: React.MutableRefObject<WebSocket | null>,
  ) {}

  sendMessage = () => {
    if (this.messageInput.trim() !== '') {
      const message: MessageModel = { sender: this.playerName, text: this.messageInput };
      this.webSocket.current?.send(JSON.stringify(message));
      this.setInput('');
    }
  };

  handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.sendMessage();
    }
  };
}
