export interface Pokemon {
  name: string
  url: string
}

export interface PokemonData {
  name: string;
  id: string;
  height: string;
  weight: string;
  stats: PokemonStats[];
  types: PokemonType[];
  img: string;
}

export type PokemonType = {
  slot: string,
  type: {
    name: string,
    url: string
  }
}

type PokemonStats = {
  base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}