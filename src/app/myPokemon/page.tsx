'use client'
import PokeCard from "@/components/PokeCard"
import { Box, Flex, SimpleGrid, Skeleton, Image, Link } from "@chakra-ui/react"
import PokeModal from "@/components/PokeModal"
import { useMyPokemon } from "@/hooks/useMyPokemon"
import { useModal } from "@/hooks/useModal"

export default function MyPokemon() {
  const {myPokemon, setMyPokemon} = useMyPokemon()
  const [isOpen, onClose, handleViewPokemon, selectedPokemon] = useModal();
  return (
      <Flex direction="column" justifyContent={{ base: "start", md:"center" }} alignItems="center" minH="100vh" gap={10} py={28} px={4}>
        {myPokemon.length > 0 ?
          <>
            {/* Your Pokemon Page Title */}
            <Image src={'/your_pokemon.png'} w={250} />
            {/* Caught Pokemons */}
            <SimpleGrid spacing="10" columns={{ base: 1, lg:3 }}>
            {myPokemon.map((pokemon) => (
                <Box
                  as="button"
                  key={pokemon.id}
                  onClick={() => handleViewPokemon(pokemon)}
                >
                    <Skeleton height='full' isLoaded borderRadius="xl">
                      <PokeCard
                        name={pokemon.name} 
                        id={pokemon.id}
                        height={pokemon.height}
                        weight={pokemon.weight}
                        stats={pokemon.stats}
                        types={pokemon.types}
                        img={pokemon.img}
                      />
                    </Skeleton>
                </Box>
              ))}
            </SimpleGrid> 
          </> :
        <Link href={'/'} marginTop={36}>
          <Image src={'/go_catch.png'} w={450} />
        </Link>
        }
        <PokeModal isOpen={isOpen} onClose={onClose} selectedPokemon={selectedPokemon} myPokemon={myPokemon} setMyPokemon={setMyPokemon} />
      </Flex>                    
  )
}
