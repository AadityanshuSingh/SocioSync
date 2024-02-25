import React from 'react'
import { Avatar, Box, Card, HStack,Text, VStack } from '@chakra-ui/react'
import {HamburgerIcon, PhoneIcon, Search2Icon} from '@chakra-ui/icons'
import { MediaDrawer } from './MediaDrawer'
import { useSelector } from 'react-redux'
export const Nav = () => {

    const {currentRoom} = useSelector(state => state.online);
  return (
        <Card 
        bg={"inherit"}
        direction={"row"} 
        w={"100%"} 
        justify={"space-between"} 
        pr={4} 
        borderRadius={0} 
        shadow={0}
        mt={2}
        >
            <Card bg={"inherit"} color={"#b7b8bc"} shadow={0} h={"100%"}>
               <HStack ml={2} >
                <Avatar size={'md'} src={`https://api.dicebear.com/5.x/initials/svg?seed=${currentRoom.name}`}/>
                <VStack align={"left"} ml={2} gap={0}>
                <Text>{currentRoom.name}</Text>
                <Text fontSize={'smaller'}>{currentRoom.userName}</Text>
                </VStack>
               </HStack>
            </Card>
            <Card bg={"inherit"} borderRadius ={0} shadow={0}>
                <HStack gap={6} >
                    <Search2Icon color={"#b7b8bc"}/>
                    <PhoneIcon color={"#b7b8bc"}/>
                    {/* <HamburgerIcon color={"#b7b8bc"}/> */}
                    <MediaDrawer/>
                </HStack>
            </Card>
    </Card>
  )
}
