import { Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react'
import { AttachmentIcon } from '@chakra-ui/icons'
import {IoMdSend} from 'react-icons/io'
import React from 'react'

export const Message = () => {
  return (
    <InputGroup mb={2}>
        <InputLeftElement
        borderRadius={"md"} 
        _hover={{cursor: "pointer", bg: "gray.700", transition: "0.5s"}}>
            <AttachmentIcon/>
        </InputLeftElement>
        <Input 
        bg={"inherit"} 
        _focus={{borderColor: "initial", outline: "none", boxShadow: "none"}}
        borderWidth={0} 
        placeholder='Your Message'
        />
        <InputRightElement
        mr={2}
        borderRadius={"md"} 
        _hover={{cursor: "pointer", bg: "gray.700", transition: "0.5s"}}
        >
            <IoMdSend/>
        </InputRightElement>
    </InputGroup>
  )
}