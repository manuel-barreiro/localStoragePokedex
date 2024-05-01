'use client'

import { SetStateAction, createContext, useContext, useEffect, useState } from 'react'
import { PokemonData } from '../types'

type MyPokemonProviderProps = {
  children: React.ReactNode
}

type MyPokemonContext = {
  setMyPokemon: React.Dispatch<React.SetStateAction<PokemonData[]>>
  myPokemon: PokemonData[]
  handleCatch: ({setMyPokemon, selectedPokemon, onClose}: HandleCatchAndFreeProps) => void
  handleFree: ({setMyPokemon, selectedPokemon, onClose}: HandleCatchAndFreeProps) => void
}

interface HandleCatchAndFreeProps {
  setMyPokemon: React.Dispatch<SetStateAction<PokemonData[]>>,
  selectedPokemon: PokemonData | undefined,
  onClose: () => void
}

// Creo el context
const MyPokemonContext = createContext({} as MyPokemonContext)

export function useMyPokemon(): MyPokemonContext {
  return useContext(MyPokemonContext)
}

export function MyPokemonProvider ({ children }: MyPokemonProviderProps): JSX.Element {

  const [myPokemon, setMyPokemon] = useState<PokemonData[]>([])
  
  // Read localStorage
  useEffect(() => {
    const pokemonLS: string | null = localStorage.getItem('my_pokemon')
    if (pokemonLS) {
      const myPokemonLS = JSON.parse(pokemonLS)
      if (myPokemonLS.length > 0) {
        setMyPokemon(myPokemonLS)
      }
    } else {
      setMyPokemon([])
    }
  }, [])

  // Set localStorage on state change
  useEffect(() => {
    localStorage.setItem('my_pokemon', JSON.stringify(myPokemon))
  }, [myPokemon])

  function handleCatch({setMyPokemon, selectedPokemon, onClose}: HandleCatchAndFreeProps): void {
    if(selectedPokemon) {
      setMyPokemon((prev) => [...prev, selectedPokemon])
      onClose()
    }
  }

  function handleFree({setMyPokemon, selectedPokemon, onClose}: HandleCatchAndFreeProps): void {
    if(selectedPokemon) {
      setMyPokemon((prev) => prev.filter((poke) => Number(poke.id) !== Number(selectedPokemon.id)))
      onClose()
    }
  }

  return (
    <MyPokemonContext.Provider value={{ myPokemon, setMyPokemon, handleCatch, handleFree }}>
      {children}
    </MyPokemonContext.Provider>
  )
}