import { Card, Divider, HStack, VStack, Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Nav } from './Nav'
import { Message } from './Message'
import { ChatWindow } from './ChatWindow'
import { Search } from './Search'
import { UserContacts } from './UserContacts'
import { Explore } from '../Explore'



// const socket = socketIO.connect('http://localhost:4000');

// import io from "socket.io-client"
// const socket = io("http://localhost:4000");

export const Homepage = () => {

  const [currentPerson, setCurrentPerson] = useState(null);

  // const [value, setValue] = useState('');
  // const [message, setMessage] = useState("");
  // const handleChange = (event) => {
  //   event.preventDefault();
  //   setValue(event.target.value);
  // }
  // useEffect( () => {
  //     socket.on('serverMessage', (data) => {
  //       const {message} = data;
  //     });
  //     setValue("");
  //     setMessage("");
  // }, [socket,message]);

  // const sendMessage = () => {
  //   setMessage(value);
  //   recipient = value;
  //   if (recipient && message) {
  //     socket.emit('private_message', { socket, recipient, message });
  //   }
  // }
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
        width: "10px",
      },
    }}
    color={"gray.200"}
    >
    <Card h={"100vh"} bg={"inherit"} w = "100%">
        <HStack bg={"#202329"} h={"100%"} borderRadius="lg">
          {/* Contacts */}
            <Card 
            bg={"inherit"} 
            color={"#b7b8bc"} 
            shadow={0} 
            w={"40%"}
            h={"100%"}
            p={0}
            >

              <Search/>
              <VStack 
              p={1}
              ml={1}
              h={"95%"}
                overflowY={"scroll"} 
                w={"100%"}
                css={{
                    '&::-webkit-scrollbar': {
                      width: "10px",
                    },
                  }}
              >
              </VStack>
            </Card>

            <Divider orientation='vertical'/>

            {/* Chatting Area */}
            <Card bg={"inherit"} color={"#b7b8bc"} w={"100%"} h={"100%"} shadow={0} borderRadius={"2xl"}>
                <VStack 
                h={"100%"}
                >
                {currentPerson &&
                <>
                  <Nav/>
                  <ChatWindow/>
                  <Message/>
                </> 
                }
                {!currentPerson && <Explore/>}
                </VStack>
            </Card>
        </HStack>
    </Card>
  </Card>
  )
}
