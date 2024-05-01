import {
  Text,
  HStack,
  Heading,
  Box,
} from "@chakra-ui/react";
import { PokemonType } from "../../../types";
import TypeBadge from "./TypeBadge";

function CardInfo({id, name, types }: {id: string, name: string, types: PokemonType[]}) {
  return (
    <Box p={3} display="flex" flexDirection="column" alignItems="start">
        <Text fontWeight="bold" fontSize="xs">
          Nº{id.toString().padStart(4, '0')}
        </Text>
        <Heading noOfLines={1} fontSize={'xl'} fontWeight='bold' textAlign="center" textTransform="capitalize" marginBottom={3}>
          {name}
        </Heading>
        <HStack>
          {types.map((type) => (
            <TypeBadge key={type.slot} typeName={type.type.name} />
          ))}
        </HStack>          
      </Box>
  )
}

export default CardInfo