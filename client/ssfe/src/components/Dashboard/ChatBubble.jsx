/* eslint-disable react/prop-types */
import { Card, VStack, Text } from '@chakra-ui/react'
import React from 'react'

export default function ChatBubble(props) {
    const {sender, message} = props;
  return (
    <Card 
    bgGradient={"linear(to-br, #fe9c5d , #8725c5 )"} 
    mt={"2px"} 
    mb={"4px"} 
    w={"50%"}
    ml={"25%"}
    >
        <VStack align={"flex-start"}>
            <Text color={"pink.100"} fontSize={"sm"} pl={1} pr={2}>{sender}</Text>
            <Text color={"gray.300"} pl={1} pr={2}>{message}</Text>
        </VStack>
    </Card>
  )
}