import { Card, Divider, HStack, VStack, Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Nav } from '../components/Dashboard/Nav'
import { Sidebar } from '../components/Dashboard/Sidebar'
import { Outlet } from "react-router-dom"

// const socket = socketIO.connect('http://localhost:4000');

// import io from "socket.io-client"
// const socket = io("http://localhost:4000");

export const Dashboard = () => {




  return (
    <Card
    width={"100%"}
    height={"100vh"}
    bg={"#131313"}
    borderRadius={"0"}
    pb={"0px"}
    css={{
      '&::-webkit-scrollbar': {
        width: "10px",
      },
    }}
    color={"gray.200"}
    >
        <HStack bg={"inherit"} h={"100%"} w={"100%"} p={0}>
          <Card
          top="0"
          height={"100vh"}
          zIndex="1"
          >
          <Sidebar/>
          </Card>
              <Box w = "100%" h = "90%" borderRadius="lg" mb={10}>
                <Outlet/>
              </Box>
          {/* </HStack> */}
        </HStack>
    </Card>
    /* </Card> */
  )
}