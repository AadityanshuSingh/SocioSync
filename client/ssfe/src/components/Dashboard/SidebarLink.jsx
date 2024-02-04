import { Box, Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { NavLink, redirect, useLocation } from 'react-router-dom';
import * as Icons from 'react-icons/vsc';

export default function SidebarLink( {link, iconName} ) {
  const dispatch = useDispatch();
  const location = useLocation();

  const isActive = location.pathname === link.path;

//   const borderColor = useColorModeValue('gray.200', 'gray.700');
  const bgColor = isActive ? 'yellow.800' : 'transparent';
  const textColor = isActive ? 'yellow.50' : 'richblack.300';
//   console.log("the name is", iconName)
  return (
    <NavLink to={link.path}>
        <Button
            left={0}
            top={15}
            h="full"
            w="3px"
            bg="inherit"
            size={"sm"}
            >
            <Flex align="center" gap={2}>
                {/* Icon Goes Here */}
                <Icon as={Icons[iconName]} boxSize={6} />
            </Flex>
        </Button>
    </NavLink>
  );
}
