import { Box } from '@chakra-ui/react'
import React from 'react'
import ChatBubble from './ChatBubble'

export const ChatWindow = () => {

    const renderData = [
        {id: 1, sender: "Rengoku Kyujiro", message: "Orewa En Bashira!! Nino Kata. Rengoku!!"},
        {id: 2, sender: "Levi Ackerman", message: "Orewa Levi Ackerman"},
        {id: 3, sender: "Erwin Scmidth", message: "Shinzo wo SasaGayo!!"},
        {id: 4, sender: "Rengoku Kyujiro", message: "Orewa En Bashira!! Nino Kata. Rengoku!!"},
        {id: 5, sender: "Levi Ackerman", message: "Orewa Levi Ackerman"},
        {id: 6, sender: "Erwin Scmidth", message: "Shinzo wo SasaGayo!!"},
        {id: 7, sender: "Rengoku Kyujiro", message: "Orewa En Bashira!! Nino Kata. Rengoku!!"},
        {id: 8, sender: "Levi Ackerman", message: "Orewa Levi Ackerman"},
        {id: 9, sender: "Erwin Scmidth", message: "Shinzo wo SasaGayo!!"},
        {id: 10, sender: "Rengoku Kyujiro", message: "Orewa En Bashira!! Nino Kata. Rengoku!!"},
        {id: 11, sender: "Levi Ackerman", message: "Orewa Levi Ackerman"},
        {id: 12, sender: "Erwin Scmidth", message: "Shinzo wo SasaGayo!!"},
        {id: 13, sender: "Rengoku Kyujiro", message: "Orewa En Bashira!! Nino Kata. Rengoku!!"},
        {id: 14, sender: "Levi Ackerman", message: "Orewa Levi Ackerman"},
        {id: 15, sender: "Erwin Scmidth", message: "Shinzo wo SasaGayo!!"},
    ];

    const chats = renderData.map(item => <ChatBubble key={item.id} sender={item.sender} message={item.message}/>)
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
        {chats}
    </Box>
  )
}