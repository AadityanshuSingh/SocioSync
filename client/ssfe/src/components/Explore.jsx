/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../services/operations/profileAPI";
import { UserCard } from "./ExploreFriends/UserCard";
import {
  Card,
  Box,
  Tabs,
  TabList,
  Tab,
  Divider,
  CardBody,
  HStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  setFriends,
  setRequests,
  setInvites,
} from "../redux/Slices/profileSlice";
import { socket } from "../App";
import { Search } from "./Dashboard/Search";

export const Explore = () => {
  const dispatch = useDispatch();
  const { requests, invites } = useSelector((state) => state.profile);
  const [explore, setExplore] = useState(true);
  const [invite, setInvite] = useState(false);
  const [request, setRequest] = useState(false);

  const [exploredata, setexploredata] = useState([]);

  const { allUsers } = useSelector((state) => state.profile);
  const { loginData } = useSelector((state) => state.auth);
  // const { friends, requests, invites } = useSelector((state) => state.profile);
  const handleExploreClick = () => {
    setExplore(true);
    setInvite(false);
    setRequest(false);
  };

  const handleInviteClick = () => {
    setExplore(false);
    setInvite(true);
    setRequest(false);
  };

  const handleRequestClick = () => {
    setExplore(false);
    setInvite(false);
    setRequest(true);
  };

  useEffect(() => {
    const User = allUsers.find((user) => user.userName === loginData.userName);
    let friends = User ? (User.friends ? User.friends : []) : [];
    let requests = User ? (User.requests ? User.requests : []) : [];
    let invites = User ? (User.invites ? User.invites : []) : [];
    dispatch(setFriends(friends));
    dispatch(setRequests(requests));
    dispatch(setInvites(invites));
    const friendUserNames = friends
      ? friends.map((friend) => friend.userName)
      : null;
    const requestsUserNames = requests
      ? requests.map((request) => request.userName)
      : null;
    const invitesUserNames = invites
      ? invites.map((invite) => invite.userName)
      : null;
    setexploredata(
      allUsers.filter(
        (user) =>
          friendUserNames &&
          !friendUserNames.includes(user.userName) &&
          requestsUserNames &&
          !requestsUserNames.includes(user.userName) &&
          invitesUserNames &&
          !invitesUserNames.includes(user.userName) &&
          user.userName !== User.userName
      )
    );

    const reloadUsers = () => {
      dispatch(getAllUsers());
      setexploredata(
        allUsers.filter(
          (user) =>
            friendUserNames &&
            !friendUserNames.includes(user.userName) &&
            requestsUserNames &&
            !requestsUserNames.includes(user.userName) &&
            invitesUserNames &&
            !invitesUserNames.includes(user.userName) &&
            user.userName !== User.userName
        )
      );

      requests = User ? (User.requests ? User.requests : []) : [];
      invites = User ? (User.invites ? User.invites : []) : [];

      setInvites(invites);
      setRequest(requests);
    };

    socket.on("add_new_friend", reloadUsers);
    // console.log("explore is ", exploredata);
  }, [allUsers, loginData]);

  const displayExplore = exploredata ? (
    exploredata.length > 0 ? (
      exploredata.map((item) => (
        <GridItem>
          <UserCard
            key={item.userName}
            name={item.name}
            userName={item.userName}
            friends={item.friends.length}
            description={item.description}
            imgurl={item.profilePic}
          />
        </GridItem>
      ))
    ) : (
      <></>
    )
  ) : (
    <></>
  );

  const displayInvites = invites ? (
    invites.length > 0 ? (
      invites.map((item) => (
        <GridItem>
          <UserCard
            key={item.userName}
            name={item.name}
            userName={item.userName}
            friends={item.friends.length}
            description={item.description}
            imgurl={item.profilePic}
            cardType="invites"
          />
        </GridItem>
      ))
    ) : (
      <></>
    )
  ) : (
    <></>
  );

  const displayRequests = requests ? (
    requests.length > 0 ? (
      requests.map((item) => (
        <GridItem>
          <UserCard
            key={item.userName}
            name={item.name}
            userName={item.userName}
            friends={item.friends.length}
            description={item.description}
            imgurl={item.profilePic}
            cardType="requests"
          />
        </GridItem>
      ))
    ) : (
      <></>
    )
  ) : (
    <></>
  );

  const { query } = useSelector((state) => state.search);
  const filterUsers = (usersList, query) => {
    const regex = new RegExp(query, "i"); // "i" for case-insensitive match

    return usersList.filter(
      (user) => regex.test(user.name) || regex.test(user.userName)
    );
  };

  const [filteredFriends, setfilteredFriends] = useState(null);
  useEffect(() => {
    const trimedString = query ? query.trim() : "";
    if (trimedString === "") {
      setfilteredFriends(null);
    } else {
      setfilteredFriends(filterUsers(allUsers, query));
    }
  }, [query]);

  const displayFilteredFriends = filteredFriends ? (
    filteredFriends.length > 0 ? (
      filteredFriends.map(
        (item) =>
          item && (
            <UserCard
              key={item.userName}
              name={item.name}
              userName={item.userName}
              friends={item.friends.length}
              description={item.description}
              imgurl={item.profilePic}
              cardType="none"
            />
          )
      )
    ) : (
      <></>
    )
  ) : (
    <></>
  );
  // console.log("explore is ", requests);

  return (
    <>
      <Card
        variant={"none"}
        bg={"inherit"}
        color={"gray.400"}
        borderColor={"gray.600"}
        mt={8}
        ml={4}
        mr={4}
        h={"auto"}
        w={"95%"}
      >
        <Tabs
          position="relative"
          variant="unstyled"
          borderColor={"gray.600"}
          gap={3}
        >
          <TabList>
            <Tab
              w={"150px"}
              h={"fit-content"}
              mt={4}
              mb={2}
              _selected={{
                bgGradient: "linear(to-t, purple.400, purple.600)",
                color: "gray.800",
                borderRadius: "15px",
              }}
              onClick={handleExploreClick}
            >
              Explore
            </Tab>
            <Tab
              w={"150px"}
              h={"fit-content"}
              mt={4}
              mb={2}
              _selected={{
                bgGradient: "linear(to-t, purple.400, purple.600)",
                color: "gray.800",
                borderRadius: "15px",
              }}
              onClick={handleInviteClick}
            >
              Invites
            </Tab>
            <Tab
              w={"150px"}
              h={"fit-content"}
              mt={4}
              mb={2}
              _selected={{
                bgGradient: "linear(to-t, purple.400, purple.600)",
                color: "gray.800",
                borderRadius: "15px",
              }}
              onClick={handleRequestClick}
            >
              Requests
            </Tab>
            <Search />
          </TabList>
        </Tabs>
        <Divider />
        <CardBody>
          <Box h={"auto"} w={"90%"} ml={0} mr={0} p={0} overflow={"auto"}>
            {explore && query === null && (
              <Grid
                templateColumns={"repeat(3, 1fr)"}
                gap={3}
                overflowX={"auto"}
                overflowY={"auto"}
                css={{
                  "&::-webkit-scrollbar": {
                    width: "0px",
                  },
                }}
              >
                {displayExplore}
              </Grid>
            )}
            {invite && query === null && (
              <Grid
                templateColumns={"repeat(3, 1fr)"}
                gap={3}
                overflowX={"auto"}
                overflowY={"auto"}
                css={{
                  "&::-webkit-scrollbar": {
                    width: "0px",
                  },
                }}
              >
                {displayInvites}
              </Grid>
            )}
            {request && query === null && (
              <Grid
                templateColumns={"repeat(3, 1fr)"}
                gap={3}
                overflowX={"auto"}
                overflowY={"auto"}
                css={{
                  "&::-webkit-scrollbar": {
                    width: "0px",
                  },
                }}
              >
                {displayRequests}
              </Grid>
            )}
            {query && (
              <Grid
                templateColumns={"repeat(3, 1fr)"}
                gap={3}
                overflowX={"auto"}
                overflowY={"auto"}
                css={{
                  "&::-webkit-scrollbar": {
                    width: "0px",
                  },
                }}
              >
                {displayFilteredFriends}
              </Grid>
            )}
          </Box>
        </CardBody>
      </Card>
    </>
  );
};
