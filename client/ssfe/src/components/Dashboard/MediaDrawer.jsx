import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  Box,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure,
  HStack,
  Divider,
  Image,
  Grid,
  GridItem,
  VStack,
  Card,
  Icon,
} from "@chakra-ui/react";

import { BsFiletypePdf } from "react-icons/bs";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const MediaDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { loginData } = useSelector((state) => state.auth);
  const { allMedia } = useSelector((state) => state.chat);
  const { currentRoom } = useSelector((state) => state.online);
  const dispatch = useDispatch();

  // Handling Logic for Photos & Videos

  const sender = loginData.userName;
  const receiver = currentRoom.userName;
  console.log("allMedia in media drawer is ", allMedia[0]);
  const imgs = allMedia[0]
    ? allMedia[0].filter(
        (file) =>
          file.mediaType === "Photos" &&
          (file.sender === receiver || file.receiver === receiver)
      )
    : null;
  const videos = allMedia[0]
    ? allMedia[0].filter(
        (file) =>
          file.mediaType === "Videos" &&
          (file.sender === receiver || file.receiver === receiver)
      )
    : null;
  const [showAllPics, setShowAllPics] = useState(false);
  const [showAllVids, setShowAllVids] = useState(false);

  var limitedPicsSize = 3;
  if (imgs.length <= 3) {
    limitedPicsSize = imgs.length;
  }

  var limitedVidSize = 1;
  if (videos.length <= 1) {
    limitedVidSize = videos.length;
  }

  const limitedPics = imgs.slice(0, limitedPicsSize);
  const limitedVid = videos.slice(0, limitedVidSize);

  const displayPics =
    showAllPics === false
      ? limitedPics.map((item) => (
          <GridItem key={item.created_at} gap={5} w={"100%"}>
            <Image src={item.FileUrl} h={"100px"} borderRadius={"xl"} p={1} />
          </GridItem>
        ))
      : imgs.map((item) => (
          <GridItem key={item.created_at} gap={5} w={"100%"}>
            <Image src={item.FileUrl} h={"100px"} borderRadius={"xl"} p={1} />
          </GridItem>
        ));

  const displayVideos =
    showAllPics === false
      ? limitedVid.map((item) => (
          <GridItem key={item.created_at} gap={5} w={"100%"} padding={2}>
            <video src={item.FileUrl} height={"150px"} controls />
          </GridItem>
        ))
      : videos.map((item) => (
          <GridItem key={item.created_at} gap={5} w={"100%"}>
            <video src={item.FileUrl} height={"150px"} controls />
          </GridItem>
        ));

  var picTxt = showAllPics === false ? "see all" : "hide";
  var visTxt = showAllVids === false ? "see all" : "hide";
  const handlePicClick = () => {
    setShowAllPics(!showAllPics);
  };

  const handleVidClick = () => {
    setShowAllVids(!showAllVids);
  };

  // Handling Logic for Sahred Files (Basically png files)

  return (
    <>
      <IconButton
        icon={<HamburgerIcon />}
        ref={btnRef}
        onClick={onOpen}
        bg={"inherit"}
        size={"md"}
        color={"gray.300"}
        _hover={{ bg: "gray.600" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        colorScheme="gray"
      >
        <DrawerOverlay />
        <DrawerContent
          bg={"gray.700"}
          color={useColorModeValue("black", "white")}
          textColor={"gray.300"}
        >
          <DrawerCloseButton />
          <DrawerHeader>Chat Details</DrawerHeader>
          <DrawerBody
            css={{
              "&::-webkit-scrollbar": {
                width: "10px",
              },
            }}
          >
            <Box mb={4}>
              <HStack justify={"space-between"}>
                <HStack>
                  <Text fontSize={"md"}>Photos</Text>
                  <Text fontSize={"sm"} color={"gray.400"}>
                    {imgs.length}
                  </Text>
                </HStack>
                {imgs.length > 3 && (
                  <Text
                    fontSize={"sm"}
                    color={"gray.400"}
                    _hover={{ cursor: "pointer" }}
                    onClick={handlePicClick}
                  >
                    {picTxt}
                  </Text>
                )}
              </HStack>
              <Grid templateColumns="repeat(3, 1fr)">{displayPics}</Grid>
            </Box>
            <Divider />
            <Box>
              <HStack justify={"space-between"}>
                <HStack>
                  <Text fontSize={"md"}>Videos</Text>
                  <Text fontSize={"sm"} color={"gray.400"}>
                    {videos.length}
                  </Text>
                </HStack>
                {videos.length > 3 && (
                  <Text
                    fontSize={"sm"}
                    color={"gray.400"}
                    _hover={{ cursor: "pointer" }}
                    onClick={handleVidClick}
                  >
                    {visTxt}
                  </Text>
                )}
              </HStack>
              <Grid templateColumns="repeat(1, 1fr)" mt={2}>
                {displayVideos}
              </Grid>
            </Box>
            <Box>
              <VStack alignItems={"left"} mt={4}>
                <Card
                  bg={"inherit"}
                  shadow={"xl"}
                  p={4}
                  _hover={{ bg: "gray.600", cursor: "pointer" }}
                >
                  <HStack>
                    <Icon
                      as={BsFiletypePdf}
                      bg={"inherit"}
                      color={"gray.200"}
                    />
                    <Text color={"gray.300"}>Abracadabra!!...</Text>
                  </HStack>
                </Card>
              </VStack>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
