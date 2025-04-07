import React, { useEffect, useRef } from "react";
import {
  Avatar,
  Box,
  Card,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
  useToast,
  Button,
} from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";
import { MediaDrawer } from "./MediaDrawer";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../../App";
import { endCall, initCall } from "../../services/Vcall";
import { setRoom } from "../../redux/Slices/onlineSlice";

export const Nav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const dispatch = useDispatch();

  const { currentRoom } = useSelector((state) => state.online);
  const { loginData } = useSelector((state) => state.auth);
  const sender = loginData.userName;
  const receiver = currentRoom.userName;
  const roomName = sender < receiver ? sender + receiver : receiver + sender;

  const localRef = useRef(null);
  const remoteRef = useRef(null);
  const isCallerRef = useRef(false);
  const callTimeoutRef = useRef(null);

  const img = currentRoom.imgurl
    ? currentRoom.imgurl
    : `https://api.dicebear.com/5.x/initials/svg?seed=${currentRoom.name}`;

  const handleDisconnect = async () => {
    await endCall();
    isCallerRef.current = false;
    socket.emit("call-ended", roomName);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleConnect = () => {
    isCallerRef.current = true;
    socket.emit("call-req", { roomName, from: sender });

    toast({
      title: "Calling...",
      description: `Waiting for ${receiver} to accept`,
      status: "info",
      duration: 90000,
      isClosable: true,
      position: "top-right",
    });

    callTimeoutRef.current = setTimeout(() => {
      // socket.emit("call-missed", { roomName });
      toast.closeAll();
      toast({
        title: "No response",
        description: "The user did not respond to the call.",
        status: "info",
        duration: 3000,
        position: "top-right",
      });
    }, 90000);
  };

  useEffect(() => {
    socket.on("call-req", ({ roomName, from }) => {
      if (toast.isActive("incoming-call")) return;

      toast({
        id: "incoming-call",
        position: "top",
        duration: 90000,
        isClosable: false,
        render: ({ onClose }) => (
          <Box
            bg="gray.700"
            color="white"
            p={4}
            borderRadius="md"
            boxShadow="lg"
          >
            <Text fontWeight="bold">{from} is calling...</Text>
            <HStack mt={2} spacing={4} justifyContent="center">
              <Button
                colorScheme="green"
                onClick={() => {
                  socket.emit("call-accepted", { roomName });
                  onClose();
                  onOpen();
                  setTimeout(() => {
                    if (localRef.current && remoteRef.current) {
                      initCall(roomName, localRef.current, remoteRef.current);
                    }
                  }, 300);
                }}
              >
                Accept
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  socket.emit("call-rejected", { roomName });
                  onClose();
                }}
              >
                Reject
              </Button>
            </HStack>
          </Box>
        ),
      });
    });

    socket.on("call-accepted", ({ roomName }) => {
      clearTimeout(callTimeoutRef.current);
      onOpen();
      setTimeout(() => {
        if (localRef.current && remoteRef.current) {
          initCall(roomName, localRef.current, remoteRef.current);
        }
      }, 300);
    });

    socket.on("call-rejected", () => {
      toast.closeAll();
      toast({
        title: "Call Rejected",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    });

    // socket.on("call-missed", () => {
    //   toast.closeAll();
    //   toast({
    //     title: "No response",
    //     description: "The user did not respond to the call.",
    //     status: "info",
    //     duration: 3000,
    //     position: "top-right",
    //   });
    // });

    socket.on("call-ended", async () => {
      await endCall();
      setTimeout(() => onClose(), 300);
    });

    return () => {
      socket.off("call-req");
      socket.off("call-accepted");
      socket.off("call-rejected");
      socket.off("call-missed");
      socket.off("call-ended");
    };
  }, [onOpen, onClose, toast]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        size="full"
        onClose={handleDisconnect}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent
          display="flex"
          justifyContent="center"
          alignItems="center"
          overflow="hidden"
          bg="gray.800"
        >
          <ModalHeader color="gray.200">Video Call</ModalHeader>
          <ModalBody p={1} mb={0}>
            <HStack gap="2px">
              <video
                ref={remoteRef}
                width="100%"
                style={{
                  backgroundColor: "black",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
                autoPlay
                playsInline
              />
              <video
                ref={localRef}
                width="100%"
                style={{
                  backgroundColor: "black",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
                autoPlay
                playsInline
                muted
              />
            </HStack>
          </ModalBody>
          <ModalFooter justifyContent="center" p={2}>
            <IconButton
              icon={<PhoneIcon />}
              colorScheme="red"
              borderRadius="15px"
              onClick={handleDisconnect}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Card
        bg="inherit"
        direction="row"
        w="100%"
        justify="space-between"
        pr={4}
        borderRadius={0}
        shadow={0}
        mt={2}
      >
        <Card bg="inherit" color="#b7b8bc" shadow={0} h="100%">
          <HStack ml={2}>
            <Avatar size="md" src={img} />
            <VStack align="left" ml={2} gap={0}>
              <Text>{currentRoom.name}</Text>
              <Text fontSize="smaller">
                {currentRoom.isTyping ? "typing..." : currentRoom.userName}
              </Text>
            </VStack>
          </HStack>
        </Card>
        <Card bg="inherit" borderRadius={0} shadow={0}>
          <HStack gap={6}>
            <IconButton
              icon={<PhoneIcon />}
              onClick={handleConnect}
              bg="inherit"
              size="md"
              color="gray"
              _hover={{ bg: "gray.600" }}
            />
            <MediaDrawer />
          </HStack>
        </Card>
      </Card>
    </>
  );
};
