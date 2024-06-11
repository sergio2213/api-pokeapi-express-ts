import { Request, Response } from 'express'
import pokemonService from '../services/pokemon.service'

const getPokemonByName = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.params
  const poke = await pokemonService.getByName(name)
  if (poke !== null) {
    res.json(poke)
  } else {
    res.status(404).json({ message: 'Pokémon not found' })
  }
}

const listPokemon = async (req: Request, res: Response): Promise<void> => {
  const pokemon = await pokemonService.getAll() // PokemonWrapper
  res.json(pokemon)
}

export default {
  getPokemonByName,
  listPokemon
}
