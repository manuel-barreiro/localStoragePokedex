'use client'
import { Flex, Box, HStack, Stack, Text, Image, useColorMode } from "@chakra-ui/react"
import Link from "next/link"
import ToggleThemeButton from "./ToggleThemeButton"


function NavBar() {
  const { colorMode } = useColorMode()

  return (
    <Flex 
      w="full" alignItems="center" justifyContent="space-evenly" py={5} shadow="xl" 
      zIndex={100} position="fixed" bg={colorMode === 'dark' ? 'gray.800' : 'whitesmoke'}
    >
      <Link href={'/'}>
        <Box>
          <Image src={'/mbPokedex.png'} alt='logo' maxW={150}/>
        </Box>
      </Link>
      <Link href={'/myPokemon'}>
        <Image src={'/newPokeball.png'} w={{base: 10, md: 50}}  />
      </Link>
      <ToggleThemeButton />
    </Flex>
    )
}

export default NavBar