import { Box, Button, Flex, Link } from '@chakra-ui/core';
import React from 'react'
import NextLink from 'next/link'
import { useMeQuery } from '../generated/graphql';

export const NavBar: React.FC = ({ }) => {
  const [{ data, fetching }] = useMeQuery()
  let body = null

  if (fetching) {
    body = null
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={5}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>

      </>
    )
  } else {
    body = (
      <Flex>
        <Box mr={3}>{data.me.username}</Box>
        <Button variant="link">Logout</Button>
      </Flex>
    )
  }

  return (
    <Flex bg="tan" p={4} >
      <Box ml={"auto"}>
        {body}
      </Box>
    </Flex>
  );
}