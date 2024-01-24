import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {Box, Text, Input, InputGroup, InputRightElement, Icon, InputRightAddon} from '@chakra-ui/react'

const InputField = (props) => {
    const {label, field, password} = props;
    const [showPassword, setShowPassword] = useState(false);
    const [typ, setType] = useState("text")

    const handleClick = () => {
        if(showPassword)
        {
            setType("password");
        }
        else{
            setType("text");
        }
        setShowPassword(!showPassword);
    }
  return (
    <Box mt={"15px"} mb={"10px"}>
        <Text fontSize={"10px"} padding={1} color={"gray.400"}>{label}</Text>
        <InputGroup>
            <Input mt={"0px"} 
               placeholder={field} 
               focusBorderColor={"yellow.500"} 
               borderBottomWidth={"1px"} 
               borderTopWidth={0} 
               borderRightWidth={0} 
               bg={"gray.800"}
               type={typ}
               color={"gray.300"}/>
            {password && <InputRightAddon 
                          bg={"inherit"} 
                          onClick={handleClick} 
                          bgColor={"gray.800"} 
                          color={"whitesmoke"}
                          borderRightWidth={0} 
                          borderTopWidth={0} 
                          borderBottomWidth={"1px"}
                          borderBottomLeftRadius={0}
                          borderBottomRightRadius={"lg"}
                          borderTopRightRadius={"lg"}
                          >
             <Icon as={ showPassword ? AiOutlineEyeInvisible : AiOutlineEye}/>
            </InputRightAddon>}
        </InputGroup>
    </Box>
  )
}

export default InputField