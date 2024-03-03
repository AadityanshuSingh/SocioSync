import React, { useState } from 'react';
import { Box, Flex,Icon, VStack,Divider,Button,Text, useDisclosure} from '@chakra-ui/react';import { Link as RouterLink } from 'react-router-dom';
// import { AiOutlineHome, AiOutlineUser, AiOutlineInfoCircle, AiOutlineMail, AiOutlineSettings, AiOutlineLogout } from 'react-icons/ai';
import { VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { sidebarLinks } from '../../data/sidebar-links';
import { logout } from '../../services/operations/authAPI';
import ConfirmationModal from '../common/ConfirmationModal';
import SidebarLink from './SidebarLink';
export const Sidebar = () => {

    // Data we require
    // const { isOpen, onToggle } = useDisclosure();

    // const {loading: profileLoading } = useSelector(
    //     (state) => state.profile
    // )
    // const { loading: authLoading } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // to keep track of confirmation modal
    const [confirmationModal, setConfirmationModal] = useState(null)

    // if (profileLoading || authLoading) {
    //     return (
    //     <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
    //         <div className="spinner"></div>
    //     </div>
    //     )
    // }
    // console.log("the data is", sidebarLinks)
  return (
    <>
    <Box
    position={"sticky"}
    top={"0"}
    borderRadius="md"
    d="flex"
    flexDirection="column"
    height="100%"
    minWidth="50px"
    borderRight="1px"
    borderRightColor="richblack.700"
    backgroundColor="#131313"
    py="60px"
    zIndex="1"
    // onClick={}
    >
    <VStack spacing={6} height={"100%"}>
        {sidebarLinks.map((link) => (
        // console.log("the outgoing object is",link)
            <SidebarLink key={link.id} link={link} iconName={link.icon} />
        ))}
      <Button
          mt="300px"
          onClick={() =>
              setConfirmationModal({
                text1: 'Are you sure?',
                text2: 'You will be logged out of your account.',
                btn1Text: 'Logout',
                btn2Text: 'Cancel',
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
          }
          px={2}
          py={2}
          fontWeight="medium"
          color="300"
          bg="inherit"
          >
          <Box d="flex" alignItems="center" gapX={2}>
            <Icon as={VscSignOut} boxSize={6} />
          </Box>
      </Button>
    </VStack>
    </Box>
    {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </>
  )
}