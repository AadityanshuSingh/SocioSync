import { Box } from '@chakra-ui/react'
import React from 'react'
import ChatBubble from './ChatBubble'

export const ChatWindow = () => {
  return (
    <Box
    h={"95%"}
    overflowY={"auto"} 
    w={"100%"}
    css={{
        '&::-webkit-scrollbar': {
          width: "10px",
        },
      }}
    >
    </Box>
  )
}