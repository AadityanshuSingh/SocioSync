import { RiEditBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Image, Text, VStack, HStack } from "@chakra-ui/react";
import IconBtn from "../common/IconBtn";
import { formattedDate } from "../../utils/dateFormatter";
export default function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <>
      <Box
      h={"100%"}
      css={{
        '&::-webkit-scrollbar': {
          width: "1px",
        },
      }}
      overflow={"auto"}
      >
      <Text mb={8} mt={8} fontSize="3xl" fontWeight="medium" color="white">
        My Profile
      </Text>
      <Flex
        align="center"
        justifyContent="space-between"
        rounded="md"
        borderWidth="1px"
        borderColor="white"
        mx={"auto"}
        bg="gray.800"
        p={8}
        px={12}
        width={"80%"}
      >
        <HStack spacing={4}>
          <Image
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            boxSize="78px"
            rounded="full"
            objectFit="cover"
          />
          <VStack align="start" spacing={1}>
            <Text fontSize="lg" fontWeight="semibold" color="white">
              {user?.name}
            </Text>
            <Text fontSize="sm" color="gray.300">
              {user?.email}
            </Text>
          </VStack>
        </HStack>
        <IconBtn
          text="Edit"
          onClick={() => {
            navigate("/dashboard/profilesettings");
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </Flex>
      {/* <Box my={10}>
        
        <Flex
          alignItems="center"
          justifyContent="space-between"
          rounded="md"
          borderWidth="1px"
          borderColor="white"
          bg="gray.800"
          p={8}
          px={12}
        >
          <Text fontSize="lg" fontWeight="semibold" color="white">
            About
          </Text>
          <IconBtn
            text="Edit"
            onClick={() => {
              navigate("/dashboard/profilesettings");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </Flex>
        <Text
          mt={4}
          color={user?.profile?.about ? "white" : "gray.400"}
          fontSize="sm"
          fontWeight="medium"
        >
          {user?.profile?.about || "Write Something About Yourself"}
        </Text>
      </Box> */}
      <Box my={10}
        bg="gray.800"
        rounded="md"
        borderWidth="1px"
        borderColor="white"
        width={"80%"}
        mx={"auto"}
        >
      <VStack>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          bg="gray.800"
          p={8}
          px={4}
          mx={"auto"}
          width={"80%"}
        >
          <Text fontSize="lg" fontWeight="semibold" color="white">
            Personal Details
          </Text>
          <IconBtn
            text="Edit"
            onClick={() => {
              navigate("/dashboard/profilesettings");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
          </Flex>

            <Flex
            // mt={2}
            justify="space-between"
            p={2}
            px={4}
            mx={"auto"}
            width={"80%"}
            >
            <VStack spacing={5}>
                <Box>
                <Text mb={2} fontSize="sm" color="gray.600">
                    Name
                </Text>
                <Text fontSize="sm" fontWeight="medium" color="white">
                    {user?.name}
                </Text>
                </Box>
                <Box>
                <Text mb={2} fontSize="sm" color="gray.600">
                    Email
                </Text>
                <Text fontSize="sm" fontWeight="medium" color="white">
                    {user?.email}
                </Text>
                </Box>
                <Box>
                <Text mb={2} fontSize="sm" color="gray.600">
                    Gender
                </Text>
                <Text fontSize="sm" fontWeight="medium" color="white">
                    {user?.profile?.gender}
                </Text>
                </Box>
            </VStack>
            <VStack align="start" spacing={5}>
                <Box>
                <Text mb={2} fontSize="sm" color="gray.600">
                    Username
                </Text>
                <Text fontSize="sm" fontWeight="medium" color="white">
                    {user?.username}
                </Text>
                </Box>
                <Box>
                <Text mb={2} fontSize="sm" color="gray.600">
                    Phone Number
                </Text>
                <Text fontSize="sm" fontWeight="medium" color="white">
                    {user?.profile?.contactNumber}
                </Text>
                </Box>
                <Box>
                <Text mb={2} fontSize="sm" color="gray.600">
                    Date Of Birth
                </Text>
                <Text fontSize="sm" fontWeight="medium" color="white">
                    {formattedDate(user?.profile?.dateOfBirth) ||
                    "Add Date Of Birth"}
                </Text>
                </Box>
            </VStack>
            </Flex>
            </VStack>
      </Box>
      </Box>
      
    </>
  );
}
