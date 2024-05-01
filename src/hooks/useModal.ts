import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { PokemonData } from '../../types';


//El propósito de este hook es abstraer la lógica que le da funcionalidad al PokeModal.
export function useModal(): [boolean, () => void, (pokemon: PokemonData) => void, PokemonData | undefined] {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonData>();

  function handleViewPokemon(pokemon: PokemonData) {
    setSelectedPokemon(pokemon);
    onOpen();
  }

  return [isOpen, onClose, handleViewPokemon, selectedPokemon];
}
