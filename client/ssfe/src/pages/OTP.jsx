import { Card, CardBody, Text, Box, HStack, PinInput, PinInputField, Button, Center, Link } from "@chakra-ui/react"
import { RepeatClockIcon, ArrowBackIcon } from '@chakra-ui/icons'
export const OTP = () => {
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
                    <Text color={"gray.100"} fontSize={"20px"} >Verify your Email</Text>
                    <Text color={"gray.400"} fontSize={"13px"}> A verification mail has been sent to you. Enter the code below </Text>
                    <Center>
                    <HStack mt={2} mb={4}>
                        <PinInput type='number' placeholder="-">
                            <PinInputField color={"gray.200"}/>
                            <PinInputField color={"gray.200"}/>
                            <PinInputField color={"gray.200"}/>
                            <PinInputField color={"gray.200"}/>
                            <PinInputField color={"gray.200"}/>
                            <PinInputField color={"gray.200"}/>
                        </PinInput>
                    </HStack>
                    </Center>
                        <Center>
                        <Button w={"90%"} fontSize={"15px"} bgColor={"#cbb06a"}  _hover={{bg: "yellow.500"}}> Verify Email</Button>
                        </Center>
                    <HStack fontSize={"small"} justify={"space-between"} pr={2} pl={2} mt={4}>
                      <Link color={"gray.400"} href="/login" _hover={{color:"yellow.400"}}>
                        <ArrowBackIcon/>
                        return to login
                      </Link>
                      <Text color={"blue.200"} _hover={{cursor: "pointer"}}><RepeatClockIcon/>resend Otp</Text>
                    </HStack>
            </CardBody>
        </Card>
    </Card>
  )
}

export default OTP