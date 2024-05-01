'use client'

import { ChakraProvider, extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { colors } from "./colors";
import { ColorModeScript } from '@chakra-ui/react'

// 2. Add your color mode config
const config: ThemeConfig = {
  useSystemColorMode: true,
}

const theme = extendTheme({ colors, config });

export function Providers({ children }: { children: React.ReactNode }) {
  return (
  <ChakraProvider theme={theme} toastOptions={{ defaultOptions: { position: 'bottom' } }}>
    <ColorModeScript initialColorMode={theme.config.useSystemColorMode} />
    {children}
  </ChakraProvider>
  )
}