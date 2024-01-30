import { Avatar, AvatarBadge, Box, Card, HStack,Image,Text } from '@chakra-ui/react'
import dummy from '../../assets/People1.png'
import React from 'react'

export const UserContacts = () => {
    const num = 1
  return (
    <Card
    bg={"inherit"}
    color={"gray.300"}
    _active={{bg: "gray.600"}}
    w={"100%"}
    pl={2}
    borderRadius={"lg"}
    _hover={{bg: "gray.600", cursor:"pointer"}}
    >
        <HStack w={"100%"} pt={2} pb={2}>
            <Avatar src={dummy} size={"sm"}>
                {num > 0 && 
                <AvatarBadge 
                bg={"green.400"}
                border={0}
                boxSize={"1em"}>
                    {num}
                </AvatarBadge>}
            </Avatar>
            <Box w={"100%"}>
                <Text fontSize={"sm"} color={"gray.200"}>Office Chat</Text>
                <Text fontSize={"sm"} color={"gray.400"}>Tatake ...</Text>
            </Box>
        </HStack>
    </Card>
  )
}
