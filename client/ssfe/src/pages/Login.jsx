import { Button, Card, CardBody, Image, Box, Input, Text, Hide, Link } from '@chakra-ui/react'
import pic from "../assets/People1.png"
import Logo from "../components/Logo.jsx"
import React, { useState } from 'react'
import InputField from '../components/InputField.jsx'

export const Login = () => {
  const [signUp, setSignUp] = useState(false);
  const LoginData = [
    {l : 'Email Address', f : 'Enter your Email Address', p : false},
    {l : 'Password', f : 'Enter your Password', p : true},
  ];
  const SignUpData = [
    {l : 'Email Address', f : 'Enter your Email Address', p : false},
    {l : 'Name', f : 'Enter Your Name', p : false},
    {l : 'UserName (This should be unique)', f : 'Enter your UserName', p : false},
    {l : 'Password', f : 'Enter your Password', p : true},
    {l : 'Confirm Password', f : 'Confirm your Password', p : true},
  ];

  const renderData = signUp == true ? SignUpData.map(item => (
    <InputField key={item.l} label={item.l} field={item.f} password={item.p}/>
  )) : LoginData.map(item => (<InputField key={item.l} label={item.l} field={item.f} password={item.p}/>));

  const LinkData = signUp == true ? 'Login' : 'SignUp';
  const btnData = signUp == true ? 'SignUp' : 'Login';
  const topData = signUp == false ? "Don't Have an account" : 'Already have an account';

  const handleClick = () => {
    setSignUp(!signUp);
  }

  return (
    <Card width={"100%"} height={"100vh"} bg={"#1a202f"} borderRadius={"0"} overflow={"auto"} pt={"20px"} pb={"20px"}>
      <Card direction={"row"} mt={"auto"} mb={"auto"} align={"center"} width={"60%"} mx={"auto"} variant={"filled"} borderRadius={"lg"} bg={"black"} shadow={"md"} p={4} >
        <CardBody shadow={"xl"} bg={"#2d3250"} borderRadius={"lg"} >
          <Box>
          <Logo ht={130} wt={470}/>
          <Text fontSize={"20px"} color={"gray.200"}>{btnData}</Text>
          <Text color={"gray.500"}>{topData} <Link color={"yellow.500"} onClick={handleClick}>{LinkData}?</Link></Text>
          </Box>
          {renderData}
          <Button bgColor={"#cbb06a"} w={"50%"} mt={"20px"} _hover={{bg: "yellow.500"}}>
            {btnData}
          </Button>
        </CardBody>
          <Hide below="lg">
          <CardBody height={"100%"} padding={0} >
          <Image src={pic} height={"100%"} borderTopRightRadius={"lg"} borderBottomRightRadius={"lg"} p={0}/>
          </CardBody>
          </Hide>
      </Card>
    </Card>
  )
}
