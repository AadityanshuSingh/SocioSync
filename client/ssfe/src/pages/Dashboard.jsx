import { Card, Divider, HStack, VStack, Box } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Nav } from '../components/Dashboard/Nav'
import { Sidebar } from '../components/Dashboard/Sidebar'
import { Outlet } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { socket } from '../App'
import { addMessage, addMessagesToBeUpdated, populateHistory } from '../redux/Slices/chatSlice'
import { getHistory, updateChat } from '../services/operations/chatAPI'

export const Dashboard = () => {
  const {loginData} = useSelector(state => state.auth);
  const {allMessages} = useSelector(state => state.chat);
  const {messagesToBeUpdated} = useSelector(state => state.chat);

  const dispatch = useDispatch();

  // handling the logic when tab closes
  useEffect(() => {
    const roomNames = [];
    for(const friend in loginData.friends){
      let room = (loginData.userName < friend.userName) ? (loginData.userName + friend.userName) : (friend.userName + loginData.userName)
      roomNames.push(room);
    }
    socket.emit('handle_disconnect', {roomNames});
    const handleBeforeUnload = async (event) => {
        event.preventDefault();
        event.returnValue = ''; // Some browsers require this
      // Perform database call
      try {
        if(messagesToBeUpdated && messagesToBeUpdated.length !== 0)
        {
        dispatch(updateChat(messagesToBeUpdated));
        console.log("api called for db call");
        }
      } catch (error) {
        console.error('Error during cleanup:', error);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  });

  // handling received messages
  useEffect(() => {
    const handleReceivedMessages = (messageObj) => {
      messageObj.owner = loginData.userName;
      dispatch(addMessage(messageObj));
      dispatch(addMessagesToBeUpdated(messageObj));
      console.log("message after storing it to allMessages ", messageObj);
    } 

  // handling single connection messages
    const handleSingleConnecton = (messageObj) => {
      dispatch(addMessage(messageObj));
      const  query = [];
      query.push(messageObj);
      dispatch(updateChat(query));
      console.log("message directly stored to db as only one socket was present.");
    }

    // Listen for incoming messages when both the users are online
    socket.on('receive_private_message', handleReceivedMessages);

    // Listen for the event when only one user is online
    socket.on('user_is_alone', handleSingleConnecton);

    return () => {
      //  when component unmounts
      socket.off('receive_private_message', handleReceivedMessages);
      socket.off('user_is_alone', handleSingleConnecton);
    }
  }, [dispatch]);

  // extracting history of chats from chat
  useEffect(() => {
    dispatch(getHistory(loginData.userName));
    // dispatch(populateHistory());
  }, [dispatch]);


  return (
    <Card
    width={"100%"} 
    height={"100vh"} 
    bg={"#131313"} 
    borderRadius={"0"} 
    overflow={"auto"} 
    pb={"10px"}
    css={{
      '&::-webkit-scrollbar': {
        width: "5px",
      },
    }}
    color={"gray.200"}
    >
        <HStack bg={"inherit"} h={"100%"} w={"100%"} p={0}>
          {/* sidebar */}
            <Sidebar/>
              <Box w = "100%" h = {"100%"} borderRadius="lg">
                <Outlet />
              </Box>
          {/* </HStack> */}
        </HStack>
    </Card>
  )
}