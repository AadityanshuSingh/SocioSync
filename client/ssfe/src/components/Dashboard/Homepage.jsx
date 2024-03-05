import { Card, Divider, HStack, VStack, Box, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Nav } from '../Dashboard/Nav'
import { Message } from '../Dashboard/Message'
import { ChatWindow } from '../Dashboard/ChatWindow'
import { Search } from '../Dashboard/Search'
import { UserContacts } from '../Dashboard/UserContacts'
import { Explore } from '../Explore'
import { useDispatch, useSelector } from 'react-redux'

export const Homepage = () => {
  const dispatch = useDispatch();

  const {allUsers} = useSelector(state => state.profile)
  const {loginData} = useSelector(state => state.auth)
  const {currentRoom} = useSelector(state => state.online);

  const User = allUsers.find(item => item.userName === loginData.userName)

  const displayFriends = User ? User.friends.length > 0 ? User.friends.map(item => (
    item && <UserContacts key={item.email} name={item.name} cardType={"friends"} userName={item.userName}/>
  )):<></>:<></>

  const displayInvites = User ? User.invites.length > 0 ? User.invites.map(item => (
    item && <UserContacts key={item.email} name={item.name} cardType={"invites"} userName={item.userName}/>
  )):<></>:<></>

  const displayRequests = User ? User.requests.length > 0 ? User.requests.map(item => (
    item && <UserContacts key={item.email} name={item.name} cardType={"requests"} userName={item.userName}/>
  )): <></>:<></>
  

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
    <Card h={"100%"} bg={"inherit"} ml={0}>
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