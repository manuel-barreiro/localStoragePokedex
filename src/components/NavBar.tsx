'use client'
import { Flex, Box, Image, useColorMode } from "@chakra-ui/react"
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
          <Image src={'/mbPokedex.png'} alt='logo' maxW={200}/>
        </Box>
      </Link>
      <div className="flex gap-4 items-center">
        <Link href={'/myPokemon'}>
          <Image src={'/newPokeball.png'} w={{base: 10, md: 50}}  />
        </Link>
        <ToggleThemeButton />
      </div>
    </Flex>
    )
}

export default NavBar