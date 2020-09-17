import { Box, Button, Flex, Link } from '@chakra-ui/core';
import React from 'react'
import NextLink from 'next/link'
import { useLogoutMutation, useMeQuery } from '../generated/graphql';

interface NavBarProps { }

export const NavBar: React.FC<NavBarProps> = ({ }) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
  const [{ data, fetching: loginFetching }] = useMeQuery()
  let body = null

  if (loginFetching) {
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
        <Button onClick={() => {
          logout()
        }}
          isLoading={logoutFetching}
          variant="link">Logout</Button>
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