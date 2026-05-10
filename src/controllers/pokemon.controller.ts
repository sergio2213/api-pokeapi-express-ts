import { NextFunction, Request, Response } from "express";
import pokemonService from "../services/pokemon.service";

const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { identifier } = req.params;
    const pokemon = await pokemonService.fetchPokemonByName(identifier);
    res.json(pokemon);
  } catch (error) {
    next(error);
  }
};

const index = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = parseInt(req.query.offset as string) || 0;
    const baseUrl = `${req.protocol}://${req.get("host")}/api/v1/pokemon`;
    const paginatedData = await pokemonService.getPaginatedPokemon(
      limit,
      offset,
      baseUrl,
    );
    res.json(paginatedData);
  } catch (error) {
    next(error);
  }
};

export default {
  getOne,
  index,
};
