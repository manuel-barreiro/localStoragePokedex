import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraUIProvider } from '../theme/chakra-provider'
import NavBar from "@/components/NavBar";
import { Flex } from "@chakra-ui/react";
import { MyPokemonProvider } from "../../context/MyPokemonContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MB Pokédex",
  description: "Catch them if you can!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <MyPokemonProvider>
          <ChakraUIProvider>
            <NavBar />
            <Flex w="full" justifyContent="center">
              {children}
            </Flex>
          </ChakraUIProvider>
        </MyPokemonProvider>
      </body>
    </html>
  );
}
