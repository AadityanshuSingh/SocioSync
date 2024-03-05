// import React from "react";
// import { Grid, GridItem, Box, Button, Flex } from "@chakra-ui/react";
// import { useSelector } from "react-redux";
// import { Explore } from "../Explore";


// export default function Friends() {
//   const { user } = useSelector((state) => state.profile);

//   // Assuming `user.friends` is an array of user objects for friends
//   const friends = user?.friends || [];

//   const handleFriendsClick = () => {
//     <Explore inputArray = {friends}></Explore>
//     console.log("Handling Friends click...");
//   };

//   return (
//     <Box width={"60%"} mx="auto">
//       <Flex justify="space-between" mb={4}>
//         <Button colorScheme="yellow" onClick={handleFriendsClick}>
//           Friends
//         </Button>
//         <Button colorScheme="yellow">Invites</Button>
//         <Button colorScheme="yellow">Requests</Button>
//         <Button colorScheme="yellow">Explore Community</Button>
//       </Flex>
//       <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
//         {friends.map((friend, index) => (
//           <GridItem key={index}>
//             <UserCard user={friend} />
//           </GridItem>
//         ))}
//       </Grid>
//     </Box>
//   );
// }
