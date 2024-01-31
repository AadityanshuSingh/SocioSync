import { HamburgerIcon } from '@chakra-ui/icons'
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, Box, DrawerHeader, DrawerOverlay, IconButton, Text, useColorModeValue, useDisclosure, HStack, Divider, Image, Grid, GridItem, VStack, Card, Icon } from '@chakra-ui/react'

import { BsFiletypePdf } from "react-icons/bs";
import pic1 from '../../assets/People1.png'
import pic2 from '../../assets/emojis.jpg'
import pic3 from '../../assets/Logo.png'
import pic4 from '../../assets/chatbg.jpg'

import React, { useState } from 'react'

export const MediaDrawer = () => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const btnRef = React.useRef()


  // Handling Logic for Photos & Videos

  const imgs = [pic1, pic2, pic3, pic4];
  const [showAllPics, setShowAllPics] = useState(false);

  var limitedPicsSize = 3;
  if(imgs.length <= 3){
    limitedPics = imgs.length;
  }

  const limitedPics = imgs.slice(0, limitedPicsSize);

  const displayPics = showAllPics === false ? limitedPics.map(item => (
    <GridItem 
    key={item}
    gap={5}
    w={"100%"}
    >
      <Image 
      src={item}
      h={"100px"} 
      borderRadius={"xl"}
      p={1}
      />
    </GridItem>
  )) : imgs.map(item => (
    <GridItem 
    key={item}
    gap={5}
    w={"100%"}
    >
      <Image 
      src={item}
      h={"100px"} 
      borderRadius={"xl"}
      p={1}
      />
    </GridItem>
  ))

  var picTxt = showAllPics === false ? "see all" : "hide"
  const handlePicClick = () => {
    setShowAllPics(!showAllPics)
  }


  // Handling Logic for Sahred Files (Basically png files)

  return (
    <>
      <IconButton
      icon={<HamburgerIcon/>}
      ref={btnRef}
      onClick={onOpen}
      bg={"inherit"}
      size={"md"}
      color={"gray.300"}
      _hover={{bg:"gray.600"}}
      />
      <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
      finalFocusRef={btnRef}
      colorScheme='gray'
      >
        <DrawerOverlay/>
        <DrawerContent
        bg={"gray.700"}
        color={useColorModeValue("black", "white")}
        textColor={"gray.300"} 
        >
          <DrawerCloseButton/>
          <DrawerHeader>
            Chat Details
          </DrawerHeader>
          <DrawerBody
          css={{
            '&::-webkit-scrollbar': {
              width: "10px",
            },
          }} 
          >
            <Box 
            mb={4}>
              <HStack justify={"space-between"}>
              <HStack>
              <Text fontSize={"md"}>Photos & Videos</Text>
              <Text fontSize={"sm"} color={"gray.400"}>108</Text>
              </HStack>
              {
                imgs.length>3 
                &&
                <Text 
              fontSize={"sm"} 
              color={"gray.400"}
              _hover={{cursor:"pointer"}}
              onClick={handlePicClick}
              >
              {picTxt}
              </Text>
              }
              </HStack>
              <Grid templateColumns="repeat(3, 1fr)">
              {displayPics}
              </Grid>
            </Box>
            <Divider/>
            <Box>
            <HStack justify={"space-between"}>
              <HStack>
              <Text fontSize={"md"}>Photos & Videos</Text>
              <Text fontSize={"sm"} color={"gray.400"}>108</Text>
              </HStack>
              {
                imgs.length>3 
                &&
                <Text 
              fontSize={"sm"} 
              color={"gray.400"}
              _hover={{cursor:"pointer"}}
              onClick={handlePicClick}
              >
              see all
              </Text>
              }
              </HStack>

              <VStack
              alignItems={"left"}
              mt={4}
              >
                <Card bg={"inherit"}
                shadow={"xl"}
                p={4}
                _hover={{bg:"gray.600", cursor:"pointer"}}
                >
                  <HStack >
                    <Icon 
                    as={BsFiletypePdf}
                    bg={"inherit"} 
                    color={"gray.200"}
                    />
                    <Text 
                    color={"gray.300"}>
                    Abracadabra!!...
                    </Text>
                  </HStack>
                </Card>
              </VStack>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
