'use client'

import { Button, useColorMode, Image } from "@chakra-ui/react"

function ToggleThemeButton() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <header>
      <Button onClick={toggleColorMode} display="flex" justifyContent="center" alignItems="center">
       <Image src={colorMode === 'light' ? '/moon.svg' : '/sun.svg'} w={5} />  
      </Button>
    </header>
  )
}

export default ToggleThemeButton