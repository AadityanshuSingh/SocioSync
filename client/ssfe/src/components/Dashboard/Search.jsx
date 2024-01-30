import { Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import React from 'react'

export const Search = () => {
  return (
    <InputGroup mb={2} mt={2} ml={1}>
        <InputLeftElement
        borderRadius={"md"} 
        _hover={{cursor: "pointer", bg: "gray.700", transition: "0.5s"}}
        >
            <Search2Icon/>
        </InputLeftElement>
        <Input 
        bg={"#2e333d"} 
        _focus={{borderColor: "initial", outline: "none", boxShadow: "none"}}
        borderWidth={0} 
        placeholder='search'
        fontSize={"sm"}
        color={"gray.400"}
        />
    </InputGroup>
  )
}
