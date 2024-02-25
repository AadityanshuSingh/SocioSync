import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Center, Divider, HStack, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, StackDivider, Text, VStack, useDisclosure } from '@chakra-ui/react'
import {ViewIcon} from "@chakra-ui/icons"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { sendrequest } from '../../services/operations/friendsAPI'
import { useEffect } from 'react'

export const UserCard = (props) => {
    const {name, userName, friends, description} = props
    const photo = `https://api.dicebear.com/5.x/initials/svg?seed=${name}`
    const {token} = useSelector(state => state.auth) || localStorage.authToken;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = () => {
        dispatch(sendrequest(token, userName, navigate));
    };

  return (
    <Card 
    bg={"gray.900"} 
    m={2}
    w={"100%"}
    borderWidth={"5px"}
    borderTopColor={"purple.300"}
    borderBottom= {"none"}
    borderRight={"none"}
    borderLeft= {"none"}
    _hover={{cursor:"pointer",
             transition: "transform 0.3s ease-in-out",
             transform: "scale(1.05)",
             boxShadow: "0 0 10px #53157d",
    }}
    transition="transform 0.2s ease-in-out"
    transform="scale(1)"
    >
        <CardHeader textColor={"gray.200"} borderTopRadius={0}>
            <HStack>
                <Avatar src={photo}/>
                <VStack align={"left"}>
                    <Text>{name}</Text>
                    <Text fontSize={"sm"} color={"gray.400"}>{userName}</Text>
                </VStack>
            </HStack>
        </CardHeader>
        <CardBody>
            <Text color={"gray.400"} fontSize={"sm"}>
               {description || <Text> Hey There!! I am using SocioSync and Motka is not allowed here.</Text>}
            </Text>
        </CardBody>
        <CardFooter>
            <HStack w={"100%"} justify={"space-between"}>
                <HStack color={"gray.500"}>
                    <ViewIcon/>
                    <Text fontSize={"sm"}>{friends}</Text>
                </HStack>

                <Button bg={"purple.300"} size={"sm"} onClick={handleClick}>
                    Send Request
                </Button>
            </HStack>
        </CardFooter>
    </Card>
  )
}
