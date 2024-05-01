// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

// 2. Add your color mode config
const config: ThemeConfig = {
  useSystemColorMode: true,
}

// 3. extend the theme
const darkModeConfig = extendTheme({ config })

export default darkModeConfig