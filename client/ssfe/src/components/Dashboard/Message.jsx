import { Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react'
import { AttachmentIcon } from '@chakra-ui/icons'
import {IoMdSend} from 'react-icons/io'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { socket } from '../../App'
import { addMessage } from '../../redux/Slices/chatSlice'

export const Message = () => {

  const {loginData} = useSelector(state => state.auth);
  const sender = loginData.userName;

  const {currentRoom} = useSelector(state => state.online);
  const receiver = currentRoom.userName;

  var roomName = (sender < receiver) ? (sender + receiver) : (receiver + sender);
  // console.log("roomName is ", roomName);

  const [txt, setTxt] = useState('');
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setTxt(e.target.value);
  }

  const getTimeString = () => {
    const date = new Date();
    return date;
  };

  const handleClick = () => {
    const messageObj = {
      sender : sender,
      receiver: receiver,
      owner: sender,
      chatType: "personal",
      groupId: null,
      time: getTimeString(),
      MediaType: "Text",
      message: txt,
    };
    setTxt('');

    socket.emit('private_message', {roomName, messageObj});
    dispatch(addMessage(messageObj));
  }

  // useEffect(() => {
  //   // Join the room when component mounts
  //   // socket.emit('join_room', roomName);

  //   const handleReceivedMessages = (messageObj) => {
  //     dispatch(addMessage(messageObj));
  //     console.log("message after storing it to allMessages ", messageObj);
  //   } 

  //   // Listen for incoming messages
  //   socket.on('receive_private_message', handleReceivedMessages);

  //   return () => {
  //     //  when component unmounts
  //     socket.off('receive_private_message', handleReceivedMessages);
  //   }
  // }, [roomName, dispatch]); 

  return (
    <InputGroup mb={2}>
        <InputLeftElement
        borderRadius={"md"} 
        _hover={{cursor: "pointer", bg: "gray.700", transition: "0.5s"}}>
            <AttachmentIcon/>
        </InputLeftElement>
        <Input 
        bg={"inherit"} 
        _focus={{borderColor: "initial", outline: "none", boxShadow: "none"}}
        borderWidth={0} 
        value={txt}
        placeholder='Your Message'
        onChange={handleChange}
        />
        <InputRightElement
        mr={2}
        borderRadius={"md"} 
        _hover={{cursor: "pointer", bg: "gray.700", transition: "0.5s"}}
        onClick={handleClick}
        >
            <IoMdSend/>
        </InputRightElement>
    </InputGroup>
  )
}