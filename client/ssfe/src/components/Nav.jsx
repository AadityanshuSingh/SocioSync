import React from 'react'
import { Box, Card, HStack,Text } from '@chakra-ui/react'
import {HamburgerIcon, PhoneIcon, Search2Icon} from '@chakra-ui/icons'
export const Nav = () => {
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
                <Text>Office Chat</Text>
                <Text>45 members, 24 online </Text>
            </Card>
            <Card bg={"inherit"} borderRadius ={0} shadow={0}>
                <HStack gap={6} mt={"25%"} mb={"25%"} >
                    <Search2Icon color={"#b7b8bc"}/>
                    <PhoneIcon color={"#b7b8bc"}/>
                    <HamburgerIcon color={"#b7b8bc"}/>
                </HStack>
            </Card>
    </Card>
  )
}
