import { SetStateAction, useEffect, useState } from "react";
import { PokemonData } from "../../types";
import { catchPokemon, freePokemon } from "@/lib/functions";

interface HandleCatchAndFreeProps {
  setMyPokemon: React.Dispatch<SetStateAction<PokemonData[]>>,
  selectedPokemon: PokemonData | undefined,
  onClose: () => void
}

interface UseMyPokemonReturn {
  myPokemon: PokemonData[],
  setMyPokemon: React.Dispatch<SetStateAction<PokemonData[]>>,
  handleCatch: ({setMyPokemon, selectedPokemon, onClose}: HandleCatchAndFreeProps) => void
  handleFree: ({setMyPokemon, selectedPokemon, onClose}: HandleCatchAndFreeProps) => void
}

// Función que consulta la api interna, devolviendo los pokemons que tenemos en la json db.
async function loadMyPokemon() {
  const res = await fetch('/api/myPokemon', { method: 'GET' })
  const data = await res.json()
  return data.myPokemon
}


// Este hook brinda lo siguiente:
// -> myPokemon: estado que contiene es el array de pokemons atrapados
// -> setMyPokemon: función para modificar el estado de myPokemon
// -> handleCatch: función que gestiona atrapar el pokemon, es llamada al clickear el botón Catch en el PokeModal.
// -> handleCatch: función que gestiona liberar el pokemon, es llamada al clickear el botón Free en el PokeModal.
export function useMyPokemon(): UseMyPokemonReturn {
  const [myPokemon, setMyPokemon] = useState<PokemonData[]>([])

  function handleCatch({setMyPokemon, selectedPokemon, onClose}: HandleCatchAndFreeProps): void {
    if(selectedPokemon) {
      catchPokemon(selectedPokemon)
      setMyPokemon((prev) => [...prev, selectedPokemon])
      onClose()
    }
  }

  function handleFree({setMyPokemon, selectedPokemon, onClose}: HandleCatchAndFreeProps): void {
    if(selectedPokemon) {
      freePokemon(selectedPokemon)
      setMyPokemon((prev) => prev.filter((poke) => Number(poke.id) !== Number(selectedPokemon.id)))
      onClose()
    }
  }
  
  // Cargar los pokemons en la node-json-db al renderizar la pagina
  useEffect(() => {
    async function fetchMyPokemon() {
      const myPokemon = await loadMyPokemon()
      setMyPokemon(myPokemon)
    }
    fetchMyPokemon()
  }, [])

  return {myPokemon, setMyPokemon, handleCatch, handleFree}
}