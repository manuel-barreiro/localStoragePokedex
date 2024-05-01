import axios from "axios"
import { Pokemon, PokemonData } from "../../types"

// export async function loadAllPokemons(): Promise<PokemonData[]> {
//   const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=1302&offset=0")
//   const results: Pokemon[] = data.results
//   const pokemonPromises = results.map(async (pokemon: Pokemon ) => {
//     const { data } = await axios.get(pokemon.url)
//     const pokemonFilteredData: PokemonData = {
//       name: data.name,
//       id: data.id ,
//       height: data.height ,
//       weight: data.weight ,
//       stats: data.stats ,
//       types: data.types ,
//       img: data.sprites.other.home.front_shiny ,
//     }
//     return pokemonFilteredData
//   })
//   const pokemons = await Promise.all(pokemonPromises)
//   return pokemons
// } 

export async function loadPokemons(offSet: number): Promise<PokemonData[]> {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=12&offset=${offSet}`)
  const results: Pokemon[] = data.results
  const pokemonPromises = results.map(async (pokemon: Pokemon ) => {
    const { data } = await axios.get(pokemon.url)
    const pokemonFilteredData: PokemonData = {
      name: data.name,
      id: data.id ,
      height: data.height ,
      weight: data.weight ,
      stats: data.stats ,
      types: data.types ,
      img: data.sprites.other.home.front_shiny ,
    }
    return pokemonFilteredData
  })
  const pokemons = await Promise.all(pokemonPromises)
  return pokemons
} 

export async function catchPokemon(pokemon: PokemonData | undefined) {
  const res = await fetch('/api/myPokemon', 
    { 
      method: 'POST',
      body: JSON.stringify(pokemon)
    }
  )

  const data = await res.json()
  console.log(data)
}

export async function freePokemon(pokemon: PokemonData | undefined) {
  const res = await fetch('/api/myPokemon', 
    { 
      method: 'DELETE',
      body: JSON.stringify(pokemon)
    }
  )

  const data = await res.json()
  console.log(data)
}