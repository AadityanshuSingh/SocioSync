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
    // <Card
    // width={"100%"} 
    // height={"100vh"} 
    // bg={"#131313"} 
    // borderRadius={"0"} 
    // overflow={"auto"} 
    // pb={"20px"}
    // css={{
    //   '&::-webkit-scrollbar': {
    //     width: "10px",
    //   },
    // }}
    // color={"gray.200"}
    // >
        <HStack bg={"#202329"} h={"100vh"} w={"100%"}>
          {/* sidebar */}
            <Sidebar/>
              <Box w = "100%" h = "100vh" borderRadius="lg">
                <Outlet />
              </Box>
          {/* </HStack> */}
        </HStack>
    /* </Card> */
  )
}