/* eslint-disable react/prop-types */
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Divider,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  StackDivider,
  Text,
  VStack,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { IoPerson } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  acceptrequest,
  deleterequest,
  rejectrequest,
  sendrequest,
} from "../../services/operations/friendsAPI";
import { useEffect, useState } from "react";
import { setLoading } from "../../redux/Slices/authSlice";
import { getAllUsers } from "../../services/operations/profileAPI";
import { socket } from "../../App";

function truncateString(str, maxLength) {
  if (str === "") {
    return str;
  }
  if (str !== null && JSON.stringify(str).length > maxLength) {
    return str.slice(0, maxLength) + "...";
  } else {
    return str;
  }
}

export const UserCard = (props) => {
  const {
    name,
    userName,
    friends,
    description = "",
    cardType = "explore",
    imgurl = null,
  } = props;
  const photo = imgurl
    ? imgurl
    : `https://api.dicebear.com/5.x/initials/svg?seed=${name}`;
  const { token } =
    useSelector((state) => state.auth) || localStorage.authToken;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const truncateName = truncateString(name, 10);
  const truncateUserName = truncateString(userName, 15);
  const truncateDescription = truncateString(description, 75);

  const { loginData } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const handleAcceptRequest = () => {
    setLoading(true);
    dispatch(acceptrequest(token, userName, navigate));
    dispatch(getAllUsers());
    socket.emit("new_friend_added");
    setLoading(false);
  };

  const handleRejectRequest = () => {
    setLoading(true);
    dispatch(rejectrequest(token, userName, navigate));
    setLoading(false);
    socket.emit("new_friend_added");
  };

  const handleDeleteRequest = () => {
    setLoading(true);
    dispatch(deleterequest(token, userName, navigate));
    setLoading(false);
    socket.emit("new_friend_added");
  };

  const handleSendRequest = () => {
    setLoading(true);
    dispatch(sendrequest(token, userName, navigate));
    setLoading(false);
    socket.emit("new_friend_added");
  };

  const butns =
    cardType === "explore" ? (
      <Button
        bg={"purple.300"}
        _hover={{ bg: "purple.400" }}
        size={"sm"}
        onClick={handleSendRequest}
      >
        Send Request
      </Button>
    ) : cardType === "invites" ? (
      <HStack>
        <Button
          bg={"purple.300"}
          _hover={{ bg: "purple.400" }}
          size={"sm"}
          onClick={handleAcceptRequest}
        >
          Accept
        </Button>
        <Button
          bg={"purple.300"}
          _hover={{ bg: "purple.400" }}
          size={"sm"}
          onClick={handleRejectRequest}
        >
          Decline
        </Button>
      </HStack>
    ) : cardType === "requests" ? (
      <Button
        bg={"purple.300"}
        _hover={{ bg: "purple.400" }}
        size={"sm"}
        onClick={handleDeleteRequest}
      >
        Delete
      </Button>
    ) : (
      <></>
    );

  return (
    <Card
      bg={"gray.900"}
      m={2}
      w={"300px"}
      borderWidth={"5px"}
      borderTopColor={"purple.300"}
      borderBottom={"none"}
      borderRight={"none"}
      borderLeft={"none"}
      _hover={{
        transition: "transform 0.3s ease-in-out",
        transform: "scale(1.01)",
        boxShadow: "0 0 10px #53157d",
      }}
      transition="transform 0.2s ease-in-out"
      transform="scale(1)"
    >
      <CardHeader textColor={"gray.200"} borderTopRadius={0}>
        <HStack>
          <Avatar src={photo} />
          <VStack align={"left"}>
            <Text>{truncateName}</Text>
            <Text fontSize={"sm"} color={"gray.400"}>
              {truncateUserName}
            </Text>
          </VStack>
        </HStack>
      </CardHeader>
      <CardBody>
        <Text color={"gray.400"} fontSize={"sm"}>
          {truncateDescription || (
            <Text> Hey There!! I am using SocioSync.</Text>
          )}
        </Text>
      </CardBody>
      <CardFooter>
        <HStack w={"100%"} justify={"space-between"}>
          <HStack color={"gray.500"}>
            <IoPerson />
            <Text fontSize={"sm"}>{friends}</Text>
          </HStack>

          {!loading && butns}
          {loading && <Spinner />}
        </HStack>
      </CardFooter>
    </Card>
  );
};
