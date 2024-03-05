/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../services/operations/profileAPI'
import { UserCard } from './ExploreFriends/UserCard'
import { Grid, GridItem } from '@chakra-ui/react';


export const Explore = () => {
  const num = 0;
  const {allUsers} = useSelector(state => state.profile);
  const {loginData} = useSelector(state => state.auth)
  const display = allUsers.map(item => (item.userName !== loginData.userName &&
    <GridItem key={item._id} w={"80%"}>
      <UserCard name={item.name} userName={item.userName} friends={item.friends.length} description={null}/>
    </GridItem>
  ))

  return (
    <>
    <Grid
    w={"100%"}
    m={4}
    pl={4}
    pr={2}
    templateColumns={['repeat(4, 1fr)', 'repeat(1, 1fr)','repeat(3, 1fr)' ]} 
    overflow={"scroll"}
    css={{
      '&::-webkit-scrollbar': {
        width: "0px",
      },
    }}
    gap={1}
    >
    {display}
    </Grid>
    </>
  )
}
