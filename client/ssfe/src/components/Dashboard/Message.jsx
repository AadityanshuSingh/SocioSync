import {
  Box,
  Collapse,
  Fade,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  ScaleFade,
  Show,
  background,
  useDisclosure,
} from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";
import { IoMdSend } from "react-icons/io";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../App";
import {
  addMessage,
  addMessagesToBeUpdated,
} from "../../redux/Slices/chatSlice";

export const Message = () => {
  const { loginData } = useSelector((state) => state.auth);
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

  return (
    <>
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
              <MenuItem bg={"gray.700"} _hover={{ background: "gray.500" }}>
                <FormControl>
                  <FormLabel
                    htmlFor="file-input"
                    color="gray.300"
                    _hover={{ cursor: "pointer" }}
                  >
                    Photos & videos
                  </FormLabel>
                  <Input
                    id="file-input"
                    type="file"
                    style={{ display: "none", cursor: "pointer" }}
                    onChange={(e) => console.log(e.target.files)}
                  />
                </FormControl>
              </MenuItem>
              <MenuItem bg={"gray.700"} _hover={{ background: "gray.500" }}>
                Document
              </MenuItem>
              <MenuItem bg={"gray.700"} _hover={{ background: "gray.500" }}>
                Saved Messages
              </MenuItem>
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
