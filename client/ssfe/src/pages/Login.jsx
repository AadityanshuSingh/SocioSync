import { Button, Card, CardBody, Image } from '@chakra-ui/react'
import photu from "../assets/emojis.jpg"
import logo from '../assets/Logo.svg'
import React from 'react'

export const Login = () => {
  return (
    <Card width={"100%"} height={"100vh"} bg={"#1a202f"} borderRadius={"0"}>
      <Card direction={"row"} top={100} align={"center"} width={"50%"} mx={"auto"} variant={"outline"}>
        <CardBody>
          <Image src={logo}/>
          Left
        </CardBody>
        <CardBody >
          <Image src={photu}/>
        </CardBody>
      </Card>
    </Card>
  )
}
