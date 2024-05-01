'use client'

import {
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { PokemonData } from "../../types"
import CardImage from "./PokeCard/CardImage";
import CardInfo from "./PokeCard/CardInfo";
import { useEffect, useState } from "react";

interface PokeCardProps extends PokemonData {
  onLoad: () => void
}
function PokeCard({ name,
  id,
  height,
  weight,
  stats,
  types,
  img,
  onLoad }: PokeCardProps) {
  const { colorMode } = useColorMode()
  const mainType = types[0].type.name

  useEffect(() => {
    // Simula una carga de datos
    const fetchData = async () => {
      // Simula una carga de datos durante 1.5 segundos
      await new Promise(resolve => setTimeout(resolve, 10));
      onLoad();
    };
    fetchData()
  }, [onLoad]);
  
  return (
      <Stack
        boxShadow="xl"
        w={{ base: 'full', lg:'250px' }}
        borderRadius="xl"
        alignItems="center"
        justifyContent={{ base: 'space-between', lg:'center' }}
        direction={{ base: 'row-reverse', lg:'column' }}
        bg={colorMode === 'light' ? `${mainType}.cardBg` : 'gray.700'}
        cursor={"pointer"}
      >
        <CardImage img={img} mainType={mainType} />
        
        <CardInfo id={id} name={name} types={types} />
      </Stack>
  )
}

export default PokeCard