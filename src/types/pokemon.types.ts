export interface Pokemon {
  id: number
  name: string
  sprites: {
    front_default: string
  }
  types: string[]
  height: number
  weight: number
}

export interface PokemonListWrapper {
  next: string | null
  previous: string | null
  results: Pokemon[]
}
