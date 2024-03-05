import { Card, Divider, HStack, VStack, Box } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Nav } from '../components/Dashboard/Nav'
import { Sidebar } from '../components/Dashboard/Sidebar'
import { Outlet } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { socket } from '../App'
import { addMessage, populateHistory } from '../redux/Slices/chatSlice'
import { getHistory, updateChat } from '../services/operations/chatAPI'

export const Dashboard = () => {
  const {loginData} = useSelector(state => state.auth);
  const {allMessages} = useSelector(state => state.chat);

  const dispatch = useDispatch();

  // handling the logic when tab closes
  useEffect(() => {
    const handleBeforeUnload = async (event) => {
        event.preventDefault();
        event.returnValue = ''; // Some browsers require this
      // Perform database call
      try {
        if(allMessages && allMessages.length !== 0)
        {
          dispatch(updateChat(allMessages));
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
      console.log("message after storing it to allMessages ", messageObj);
    } 

    // Listen for incoming messages
    socket.on('receive_private_message', handleReceivedMessages);

    return () => {
      //  when component unmounts
      socket.off('receive_private_message', handleReceivedMessages);
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
    pb={"20px"}
    css={{
      '&::-webkit-scrollbar': {
        width: "10px",
      },
    }}
    color={"gray.200"}
    >
        <HStack bg={"inherit"} h={"100%"} w={"100%"} p={0}>
          {/* sidebar */}
            <Sidebar/>
              <Box w = "100%" h = "100vh" borderRadius="lg">
                <Outlet />
              </Box>
          {/* </HStack> */}
        </HStack>
    </Card>
  )
}