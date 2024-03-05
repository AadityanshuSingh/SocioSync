import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {ChatBubble} from '../Dashboard/ChatBubble'
import { useSelector } from 'react-redux'
import { Socket, io } from 'socket.io-client'

export const ChatWindow = () => {

  const {history} = useSelector(state => state.chat);

  const {allMessages} = useSelector(state => state.chat);

  // saare messages ko state se nikala aur fir usme se user ko nikal kar uske username ko sender set kar diya
  const {loginData} = useSelector(state => state.auth);
  const sender = loginData.userName; 

  // setting the current receiver
  const {currentRoom} = useSelector(state => state.online);
  const receiver = currentRoom.userName;

  // filtering the history
  const [filteredHistory, setFilteredHistory] = useState(
    history && history.length !== 0?  
    history.filter(msg => (msg.receiver === receiver && msg.sender === sender && msg.owner === sender) || 
    (msg.receiver === sender && msg.sender === receiver && msg.owner === sender)) : null);

  useEffect( () => {
    setFilteredHistory(history && history.length !== 0?  
      history.filter(msg => (msg.receiver === receiver && msg.sender === sender && msg.owner === sender) || 
      (msg.receiver === sender && msg.sender === receiver && msg.owner === sender)) : null);
  }, [sender, receiver]);


  // setting current messages
  const [messages, setMessages] = useState(
    allMessages.filter(msg => msg.sender === sender && msg.receiver === receiver)
  );

  useEffect(()=> {
      setMessages(allMessages.filter(msg => (msg.sender === sender && msg.receiver === receiver ||
         msg.sender === receiver && msg.receiver === sender)));
  }, [allMessages, sender, receiver]);

  const renderHistory = (filteredHistory !== null && filteredHistory.length !== 0) ? filteredHistory.map( (item) =>
    ( item ? 
      <ChatBubble key={item.time} sender={item.sender} message={item.message} time={item.time}/>: null
    )):null;
  
  const renderMessages = (messages !== null || messages.length !== 0) ? messages.map( (item) =>
    ( item ? 
      <ChatBubble key={item.time} sender={item.sender} message={item.message} time={item.time}/>: null
    )):null;

  return (
    <Box
    h={"95%"}
    p={2}
    overflowY={"auto"} 
    w={"100%"}
    css={{
        '&::-webkit-scrollbar': {
          width: "10px",
        },
      }}
    >
      {renderHistory}
      {renderMessages}
    </Box>
  )
}