'use client'

import PokeCard from "./PokeCard"
import {
  Container,
  SimpleGrid,
  Flex,
  Box,
  Skeleton,
  Spinner,
  Image
} from "@chakra-ui/react";
import { usePokemonLoader } from '../hooks/usePokemonLoader';
import { useInViewHandler } from '../hooks/useInViewHandler';
import { useModal } from '../hooks/useModal';
import PokeModal from "./PokeModal";
import { useMyPokemon } from "../../context/MyPokemonContext";
import { useState } from "react";

function PokeGrid(): JSX.Element {
  const [displayedPokemons, isLoaded, loadMore] = usePokemonLoader();
  const [isOpen, onClose, handleViewPokemon, selectedPokemon] = useModal();
  const { myPokemon, setMyPokemon } = useMyPokemon()
  const ref = useInViewHandler(loadMore);
  const [loadedCards, setLoadedCards] = useState<number[]>([]);
  const handleCardLoad = (pokemonId: number) => {
    setLoadedCards(prev => [...prev, pokemonId]);
  };

  return (
    <Flex alignItems="center" minH="200vh" justifyContent="center">
      <Container maxW="full">
        <Flex direction="column" alignItems="center" gap={5}>
          <SimpleGrid spacing="10" columns={{ base: 1, lg: 3 }}>
            {displayedPokemons.map((pokemon) => (
              <Box
                as="button"
                key={pokemon.id}
                onClick={() => handleViewPokemon(pokemon)}
                position="relative"
              >
                <Skeleton height='full' isLoaded={loadedCards.includes(Number(pokemon.id)) || isLoaded} borderRadius="xl">
                  {myPokemon?.some((myPoke) => Number(myPoke.id) === Number(pokemon.id)) &&
                    <Box position="absolute" top="5%" right={{ base: "2%", md: "5%" }} >
                      <Image src={'/newPokeball.png'} w={{ base: 10, md: 50 }} />
                    </Box>
                  }
                  <PokeCard
                      name={pokemon.name}
                      id={pokemon.id}
                      height={pokemon.height}
                      weight={pokemon.weight}
                      stats={pokemon.stats}
                      types={pokemon.types}
                      img={pokemon.img}
                      onLoad={() => handleCardLoad(Number(pokemon.id))}
                  />
                </Skeleton>
              </Box>
            ))}
          </SimpleGrid>
          <Spinner ref={ref} size='xl' />
        </Flex>

      </Container>

      <PokeModal isOpen={isOpen} onClose={onClose} selectedPokemon={selectedPokemon} myPokemon={myPokemon} setMyPokemon={setMyPokemon} />
    </Flex>
                             
  )
}

export default PokeGrid

