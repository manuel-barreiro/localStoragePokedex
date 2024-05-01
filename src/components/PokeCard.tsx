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
function PokeCard({ pokeCardData }: { pokeCardData: PokeCardProps}) {
  const { colorMode } = useColorMode()
  const mainType = pokeCardData.types[0].type.name
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simula una carga de datos (podrías reemplazar esto con tu lógica real de carga de datos)
    const fetchData = async () => {
      // Simula una carga de datos durante 1.5 segundos
      await new Promise(resolve => setTimeout(resolve, 10));
      // Marca la tarjeta como cargada
      setIsLoaded(true);
      // Notifica al componente padre que los datos se han cargado
      pokeCardData.onLoad();
    };
    fetchData()
  }, [pokeCardData.onLoad]);
  
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
        <CardImage img={pokeCardData.img} mainType={mainType} />
        
        <CardInfo id={pokeCardData.id} name={pokeCardData.name} types={pokeCardData.types} />
      </Stack>
  )
}

export default PokeCard