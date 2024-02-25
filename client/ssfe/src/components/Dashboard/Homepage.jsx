import { Card, Divider, HStack, VStack, Box, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Nav } from '../Dashboard/Nav'
import { Message } from '../Dashboard/Message'
import { ChatWindow } from '../Dashboard/ChatWindow'
import { Search } from '../Dashboard/Search'
import { UserContacts } from '../Dashboard/UserContacts'
import { Explore } from '../Explore'
import { useDispatch, useSelector } from 'react-redux'
// import { getAllUsers } from '../services/operations/profileAPI'

// const socket = socketIO.connect('http://localhost:4000');

// import io from "socket.io-client"
// const socket = io("http://localhost:4000");

export const Dashborad = () => {
  const dispatch = useDispatch();
  // window.onload = dispatch(getAllUsers());
  const {allUsers} = useSelector(state => state.profile)
  const {loginData} = useSelector(state => state.auth)
  const {currentRoom} = useSelector(state => state.online);
  
  console.log("allUsers are", allUsers)

  console.log('dashboard mein all users are, ' , allUsers)

  const User = allUsers.find(item => item.userName === loginData.userName)
  console.log("User is " , User);

  const displayFriends = User ? User.friends.length > 0 ? User.friends.map(item => (
    item && <UserContacts key={item.email} name={item.name} cardType={"friends"} userName={item.userName}/>
  )):<></>:<></>

  const displayInvites = User ? User.invites.length > 0 ? User.invites.map(item => (
    item && <UserContacts key={item.email} name={item.name} cardType={"invites"} userName={item.userName}/>
  )):<></>:<></>

  const displayRequests = User ? User.requests.length > 0 ? User.requests.map(item => (
    item && <UserContacts key={item.email} name={item.name} cardType={"requests"} userName={item.userName}/>
  )): <></>:<></>

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
    pt={"20px"} 
    pb={"20px"}
    css={{
      '&::-webkit-scrollbar': {
        width: "10px",
      },
    }}
    color={"gray.200"}
    >
    <Card h={"100%"} bg={"inherit"}>
        <HStack bg={"#202329"} h={"100%"} borderRadius={"2xl"}>

          {/* Friends */}
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
                  <Text>Friends</Text>
                  {displayFriends}
                  <Text>Invites</Text>
                  {displayInvites}
                  <Text>Requests</Text>
                  {displayRequests}
              </VStack>
            </Card>

            <Divider orientation='vertical'/>

            {/* Chatting Area */}
            <Card bg={"inherit"} color={"#b7b8bc"} w={"100%"} h={"100%"} shadow={0} borderRadius={"2xl"}>
                <VStack 
                h={"100%"}
                >
                {currentRoom &&
                <>
                  <Nav/>
                  <ChatWindow/>
                  <Message/>
                </> 
                }
                {!currentRoom && <Explore/>}
                </VStack>
            </Card>
        </HStack>
    </Card>
    </Card>
  )
}
