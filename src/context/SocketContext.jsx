import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { AuthContext } from '../context/AuthContext';
const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const {user ,loading} = useContext(AuthContext);
  useEffect(() => {
    // Connect to the server (change URL if different)
    const newSocket = io('http://localhost:5000');
    // const newSocket = io('https://758a-2401-4900-889a-6042-290b-b899-c3ea-cf0.ngrok-free.app');
    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.close();
    };
  }, []);


  useEffect(() => {
    if (user && socket) {
      console.log("hello",user._id);
      socket.emit('addUser', user._id);
    }
  }, [user, socket]);


  if(loading){
    return "..loading";
  }

  // Join conversation when the user selects or starts one
  const joinConversation = (conversationId) => {
    if (socket) {
      socket.emit('joinConversation', conversationId);
      setConversationId(conversationId);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, joinConversation, conversationId }}>
      {children}
    </SocketContext.Provider>
  );
};