import { useState, useEffect } from 'react';
import { loadPokemons } from '@/lib/functions';
import { PokemonData } from '../../types';

//Hook generar el infinite scroll, fetcheando los pokemons de la api incrementando el offset en 12.
export function usePokemonLoader(): [PokemonData[], boolean, () => void] {
  const [offset, setOffset] = useState(0);
  const [displayedPokemons, setDisplayedPokemons] = useState<PokemonData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchPokemons() {
      setIsLoaded(false);
      const fetchedPokemons = await loadPokemons(offset);
      setDisplayedPokemons((prevPokemons) => [...prevPokemons, ...fetchedPokemons]);
      // Agrego un retraso de 700ms antes de cambiar isLoaded a true, para mejorar la UX y que se vean bien los skeletons.
      setTimeout(() => {
        setIsLoaded(true);
      }, 1000);
    }
    fetchPokemons();
  }, [offset]);

  function loadMore() {
    setOffset((prevOffset) => prevOffset + 12);
  }

  return [displayedPokemons, isLoaded, loadMore];
}
