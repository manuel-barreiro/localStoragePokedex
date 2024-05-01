import {
  Flex,
  Box,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  Image,
  Text,
  Heading,
  HStack,
  Divider,
  Progress,
  useToast,
} from "@chakra-ui/react";
import CatchedButton from "./CatchAndFreeButton";
import TypeBadge from "./PokeCard/TypeBadge";
import { PokemonData } from "../../types";
import { SetStateAction } from "react";
import { useMyPokemon } from "@/hooks/useMyPokemon";
import { capitalizeString } from "@/lib/utils";

interface PokeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPokemon: PokemonData | undefined;
  myPokemon: PokemonData[];
  setMyPokemon: React.Dispatch<SetStateAction<PokemonData[]>>
}

function PokeModal({ isOpen, onClose, selectedPokemon, myPokemon, setMyPokemon }: PokeModalProps) {
  const { handleCatch, handleFree } = useMyPokemon()
  const toast = useToast()
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'full', lg:'lg' }} motionPreset='slideInBottom' >
        <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)' />
        <ModalContent borderTopRadius={100}>
          
          <ModalHeader textTransform="capitalize" bg={`${selectedPokemon?.types[0].type.name}.badge`} p={5} display="flex" justifyContent="space-between">
            <Image onClick={() => onClose()} src={"/chevron-left.svg"} cursor="pointer" width={8} />
            {myPokemon?.some((poke) => Number(poke.id) === Number(selectedPokemon?.id)) ?
            <div onClick={() => {
              handleFree({setMyPokemon, selectedPokemon, onClose})
              toast({
                title: `You released ${capitalizeString(selectedPokemon?.name)}`,
                description: "Catch it again before it goes far away!",
                status: "info",
                duration: 4000,
                isClosable: true,
              })
              }}>
              <CatchedButton purpose="free" />
            </div> :
            <div onClick={() => {
              handleCatch({setMyPokemon, selectedPokemon, onClose})
              toast({
                title: `You caught ${capitalizeString(selectedPokemon?.name)}!`,
                description: `One more ${capitalizeString(selectedPokemon?.types[0].type.name)} pokemon for your collection.`,
                status: "info",
                duration: 4000,
                isClosable: true,
              })
              }}>
              <CatchedButton purpose="catch" />
            </div>
            }         
          </ModalHeader>
          
          <ModalBody w="full" margin={0} padding={0} >
            <Flex w="full" direction="column" gap={10} alignItems="start" marginTop={-1} paddingBottom={10}>
              <Box w="full" h="auto" p={3} display="flex" justifyContent="center" alignItems="center" bg={`${selectedPokemon?.types[0].type.name}.badge`} borderBottomRadius={200} maxH={{ base: 250, lg: 150 }} minH={{ base: 150, lg: 50 }}>
                  <Image src={selectedPokemon?.img} maxW={300} marginTop={{ base: 16, lg: 0 }} />
              </Box>

              <Flex w="full" paddingX={10} justifyContent="space-between" alignItems="center">
                <Box display="flex" flexDirection="column" alignItems="start">
                  <Text fontWeight="bold" fontSize="sm">
                  Nº{selectedPokemon?.id.toString().padStart(4, '0')}
                  </Text>
                  <Heading noOfLines={1} fontSize={'3xl'} py={1} fontWeight='black' textAlign="center" textTransform="capitalize" marginBottom={3}>
                    {selectedPokemon?.name}
                  </Heading>
                  <HStack>
                    {selectedPokemon?.types.map((type) => (
                      <TypeBadge key={type.slot} typeName={type.type.name} />
                    ))}
                  </HStack>          
                </Box> 

                <Flex direction="column" gap={2}>
                  <Box display="flex" flexDirection="row" gap={2}>
                    <Image src={"/weight.svg"} width={5} />
                    <Text fontSize="2xl">{(Number(selectedPokemon?.weight) * 0.1).toFixed(1)} kg</Text>
                  </Box>
                  <Divider />
                  <Box display="flex" flexDirection="row" gap={2}>
                    <Image src={"/ruler.svg"} width={5} />
                    <Text fontSize="2xl">{(Number(selectedPokemon?.height) * 0.1).toFixed(1)} m</Text>
                  </Box>
                </Flex>
              </Flex>   


              <Flex direction="column" gap={1} paddingX={10} w="full">
                {selectedPokemon?.stats.map((stat, index) =>
                  <Flex direction="row" alignItems="center" gap={1} >
                    <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" flexBasis="70%">{stat.stat.name}</Text>
                    <Flex direction="row" alignItems="center" w="full" gap={1}>
                      <Text fontSize="xs" textTransform="uppercase">{stat.base_stat.toString().padStart(3, '0')}</Text>
                      <Progress borderRadius={5} w="full" size="sm" value={stat.base_stat} hasStripe/>
                    </Flex>
                  </Flex>
                )}
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
  )
}

export default PokeModal