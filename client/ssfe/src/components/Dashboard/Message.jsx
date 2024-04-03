import {
  Box,
  Button,
  Center,
  Collapse,
  Fade,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ScaleFade,
  Show,
  Spinner,
  background,
  useDisclosure,
} from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";
import { IoMdSend } from "react-icons/io";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../App";
import {
  addMessage,
  addMessagesToBeUpdated,
} from "../../redux/Slices/chatSlice";
import { mediaUpload } from "../../services/operations/mediaAPI";
import { setLoading } from "../../redux/Slices/authSlice";

export const Message = () => {
  const { loginData, loading } = useSelector((state) => state.auth);
  const sender = loginData.userName;

  const { currentRoom } = useSelector((state) => state.online);
  const receiver = currentRoom.userName;

  var roomName = sender < receiver ? sender + receiver : receiver + sender;
  // console.log("roomName is ", roomName);

  const [txt, setTxt] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setTxt(e.target.value);
  };

  const getTimeString = () => {
    const date = Date.now();
    return date;
  };

  const handleClick = () => {
    const messageObj = {
      sender: sender,
      receiver: receiver,
      owner: sender,
      chatType: "personal",
      groupId: null,
      time: getTimeString(),
      MediaType: "Text",
      message: txt,
    };
    setTxt("");

    socket.emit("private_message", { roomName, messageObj });
  };

  // handling media selection

  const [selectedFile, setselectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState(null);
  const [isOpen, setisOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleMediaInputChange = (event) => {
    const file = event.target.files[0];
    setselectedFile({
      file: file,
      mediaType: event.target.id === "image-input" ? "Photos" : "Videos",
    });
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
    setisOpen(true);
  };

  const handleClearFile = () => {
    setselectedFile(null);
    setCaption(null);
    setisOpen(false);
    document.getElementById("image-input").value = null;
    document.getElementById("video-input").value = null;
  };

  const handleSendMedia = async () => {
    const file = selectedFile ? selectedFile.file : null;
    const data = {
      sender: sender,
      receiver: receiver,
      mediaType: selectedFile.mediaType,
      time: getTimeString(),
    };
    dispatch(setLoading(true));
    const result = await dispatch(mediaUpload(file, data));
    console.log("result is ", result);
    dispatch(setLoading(false));

    const messageObj = {
      sender: sender,
      receiver: receiver,
      owner: sender,
      chatType: "personal",
      groupId: null,
      time: getTimeString(),
      MediaType: selectedFile.mediaType,
      message: caption,
      media: result.mediaUrl,
    };

    socket.emit("private_message", { roomName, messageObj });

    setisOpen(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClearFile}>
        <ModalOverlay />
        <ModalContent bg={"gray.700"} color={"gray.300"}>
          <ModalHeader>Sending Your Media</ModalHeader>
          <ModalCloseButton />
          <ModalBody gap={2}>
            <Center>
              {selectedFile && selectedFile.mediaType === "Photos" && (
                <Box h={"350px"}>
                  <Image src={preview} h={"inherit"} />
                </Box>
              )}
              {selectedFile && selectedFile.mediaType === "Videos" && (
                <Box h={"350px"}>
                  <video src={preview} height={"inherit"} />
                </Box>
              )}
            </Center>
            <Input
              mt={2}
              w={"100%"}
              placeholder="*Add Caption (optional)"
              onChange={(e) => {
                setCaption(e.target.value);
              }}
            />
          </ModalBody>
          <ModalFooter>
            <HStack justify={"space-between"}>
              {!loading && (
                <Button
                  color={"gray.800"}
                  bg={"yellow.400"}
                  _hover={{ bg: "yellow.600" }}
                  onClick={handleSendMedia}
                >
                  Send
                </Button>
              )}
              {loading && <Spinner />}
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <InputGroup mb={2}>
        <InputLeftElement
          borderRadius={"md"}
          _hover={{ cursor: "pointer", bg: "gray.700", transition: "0.5s" }}
        >
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<AttachmentIcon />}
              variant={"ghost"}
              color={"gray.400"}
              _hover={{ background: "gray.600" }}
              _active={{ background: "gray.600" }}
            />
            <MenuList bg={"gray.700"} borderColor={"gray.300"} boxShadow={"md"}>
              <FormControl>
                <MenuItem bg={"gray.700"} _hover={{ background: "gray.500" }}>
                  <FormLabel
                    htmlFor="image-input"
                    color="gray.300"
                    _hover={{ cursor: "pointer" }}
                  >
                    Photos
                  </FormLabel>
                  <Input
                    id="image-input"
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg, image/jpg, image/png, image/gif"
                    style={{ display: "none", cursor: "pointer" }}
                    onChange={handleMediaInputChange}
                  />
                </MenuItem>
                <MenuItem bg={"gray.700"} _hover={{ background: "gray.500" }}>
                  <FormLabel
                    htmlFor="video-input"
                    color={"gray.300"}
                    _hover={{ cursor: "pointer" }}
                  >
                    Videos
                  </FormLabel>
                  <Input
                    id="video-input"
                    type="file"
                    accept="video/mp4, video/mov, video/mkv"
                    style={{ display: "none", cursor: "pointer" }}
                    onChange={handleMediaInputChange}
                  />
                </MenuItem>
                <MenuItem bg={"gray.700"} _hover={{ background: "gray.500" }}>
                  Document
                </MenuItem>
                <MenuItem bg={"gray.700"} _hover={{ background: "gray.500" }}>
                  Audio
                </MenuItem>
              </FormControl>
            </MenuList>
          </Menu>
        </InputLeftElement>
        <Input
          bg={"inherit"}
          _focus={{
            borderColor: "initial",
            outline: "none",
            boxShadow: "none",
          }}
          borderWidth={0}
          value={txt}
          placeholder="Your Message"
          onChange={handleChange}
        />
        <InputRightElement
          mr={2}
          borderRadius={"md"}
          _hover={{ cursor: "pointer", bg: "gray.700", transition: "0.5s" }}
          onClick={handleClick}
        >
          <IoMdSend />
        </InputRightElement>
      </InputGroup>
    </>
  );
};
