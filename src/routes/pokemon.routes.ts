import { RequestHandler, Router } from 'express'
import pokemonController from '../controllers/pokemon.controller'

const router = Router()

router.get('/pokemon/:name', pokemonController.getPokemonByName as RequestHandler)
router.get('/pokemon', pokemonController.listPokemon as RequestHandler)

export default router
