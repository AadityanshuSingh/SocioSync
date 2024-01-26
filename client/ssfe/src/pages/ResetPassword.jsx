import React from 'react'
import { Card, CardBody, Text, HStack, Link, Center, Button, Input, Box} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

export const ResetPassword = () => {
  return (
    <Card
    width={"100%"} 
    height={"100vh"} 
    bg={"#1a202f"} 
    borderRadius={"0"} 
    overflow={"auto"} 
    pt={"20px"} 
    pb={"20px"}
    css={{
      '&::-webkit-scrollbar': {
        width: "10px",
      },
    }}
    >
        <Card mt={"auto"} mb={"auto"} align={"center"} width={["40%", "65%", "40%", "40%", "30%", "30%"]} mx={"auto"} variant={"filled"} borderRadius={"lg"} bg={"black"} shadow={"md"} p={1}>
            <CardBody shadow={"xl"} bg={"#2d3250"} borderRadius={"lg"} w={"100%"}>
                    <Text color={"gray.100"} fontSize={"20px"} >Reset Your Password</Text>
                    <Text color={"gray.400"} fontSize={"13px"}>Please enter your email address. An otp will be sent to this address.</Text>
                    <Text mb={0} mt={3} color={"gray.400"} fontSize={"small"}>Email address <sup>*</sup></Text>
                    <Center mt={0}>
                        <Input 
                        type='alphanumeric' 
                        placeholder='Email address'
                        variant={"filled"} 
                        bg={"gray.900"} 
                        _hover={{bg: "gray.900"}} 
                        focusBorderColor='yellow.600' 
                        color={"gray.300"} 
                        fontSize={"medium"}
                        mt={0}
                        mb={3}
                        />
                    </Center>
                    <Center>
                    <Button w={"100%"} fontSize={"15px"} bgColor={"#cbb06a"}  _hover={{bg: "yellow.500"}}> Send OTP</Button>
                    </Center>
                    <HStack fontSize={"small"} justify={"space-between"} pr={2} pl={2} mt={4}>
                      <Link color={"gray.400"} href="/login" _hover={{color:"yellow.400"}}>
                        <ArrowBackIcon/>
                        return to login
                      </Link>
                    </HStack>
            </CardBody>
        </Card>
    </Card>
  )
}
