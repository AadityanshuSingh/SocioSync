import { Card, Divider, HStack, VStack, Box } from '@chakra-ui/react'
import React from 'react'
import chatbg from '../assets/chatbg.jpg'
import { Nav } from '../components/Dashboard/Nav'
import { Message } from '../components/Message'
import { ChatWindow } from '../components/ChatWindow'
import { Search } from '../components/Dashboard/Search'
import { UserContacts } from '../components/Dashboard/UserContacts'

export const Dashborad = () => {
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
    <Card h={"100%"} bg={"inherit"} >
        <HStack bg={"#202329"} h={"100%"} borderRadius={"2xl"}>

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
                  <UserContacts/>
                  <UserContacts/>
                  <UserContacts/>
                  <UserContacts/>
                  <UserContacts/>
                  <UserContacts/>
                  <UserContacts/>
                  <UserContacts/>
                  <UserContacts/>
                  <UserContacts/>
                  <UserContacts/>
                  <UserContacts/>
                  <UserContacts/>
                  <UserContacts/>
                  <UserContacts/>
                  <UserContacts/>
                  <UserContacts/>
                  <UserContacts/>
                  <UserContacts/>
                  <UserContacts/>
                  <UserContacts/>
                  <UserContacts/>
                  <UserContacts/>
                  <UserContacts/>
                  <UserContacts/>
                  <UserContacts/>
                  <UserContacts/>
                  <UserContacts/>
                  <UserContacts/>
                  <UserContacts/>
                  <UserContacts/>
                  <UserContacts/>
              </VStack>
            </Card>

            <Divider orientation='vertical'/>

            {/* Chatting Area */}
            <Card bg={"inherit"} color={"#b7b8bc"} w={"100%"} h={"100%"} shadow={0} borderRadius={"2xl"}>
                <VStack 
                h={"100%"}
                >
                <Nav/>
                <ChatWindow/>
                <Message/>
                </VStack>
            </Card>
        </HStack>
    </Card>
    </Card>
  )
}
