import { Pokemon, PokemonListWrapper } from '../types/pokemon.types'

const getByName = async (name: string): Promise<Pokemon | null> => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const data = await response.json()
    const poke: Pokemon = {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
      types: data.types.map((typeObject: any) => typeObject.type.name),
      height: data.height,
      weight: data.weight
    }
    return poke
  } catch (error) {
    console.log(error)
    return null
  }
}

const getAll = async (): Promise<PokemonListWrapper> => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
    const data = await response.json()
    const pokemonListWrapper: PokemonListWrapper = {
      previous: data.previous,
      next: data.next,
      results: []
    }
    // pokemon: arreglo de Pokémon
    // poke: 1 Pokémon
    const pokemonPromises: Array<Promise<Pokemon>> = data.results.map(async (pokemon: any) => await getByName(pokemon.name))
    pokemonListWrapper.results = await Promise.all(pokemonPromises)
    return pokemonListWrapper
  } catch (error) {
    console.log('Error fetching all Pokémon', error)
    return {
      previous: null,
      next: null,
      results: []
    }
  }
}

export default {
  getByName,
  getAll
}
