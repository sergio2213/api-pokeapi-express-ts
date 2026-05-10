import { AppError } from "../errors/app-error";
import {
  PokemonDetail,
  PokemonListItem,
  PokemonPagination,
} from "../types/pokemon.types";

const BASE_URL: string = "https://pokeapi.co/api/v2/pokemon";

const fetchPokemonByName = async (name: string): Promise<PokemonDetail> => {
  const response = await fetch(`${BASE_URL}/${name}`);
  if (response.status === 404)
    throw new AppError(response.status, `Pokemon ${name} not found`);
  if (!response.ok) throw new AppError(502, "Error in the API response");
  return response.json() as Promise<PokemonDetail>;
};

const getPaginatedPokemon = async (
  limit = 20,
  offset = 0,
  baseUrl: string,
): Promise<PokemonPagination> => {
  const response = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`);
  if (!response.ok) throw new AppError(502, "Error in the API response");
  const { next, previous, results } =
    (await response.json()) as PokemonPagination;
  const nextParams = parseQueryParams(next);
  const prevParams = parseQueryParams(previous);
  const pokemonPromises = results.map((p: { name: string }) =>
    fetchPokemonByName(p.name),
  );
  const detailedResults = await Promise.all(pokemonPromises);
  return {
    next: nextParams
      ? `${baseUrl}?limit=${nextParams.limit}&offset=${nextParams.offset}`
      : null,
    previous: prevParams
      ? `${baseUrl}?limit=${prevParams.limit}&offset=${prevParams.offset}`
      : null,
    results: detailedResults.map(mapToPokemonListItem),
  };
};

const parseQueryParams = (url: string | null) => {
  if (!url) return null;
  const { searchParams } = new URL(url);
  return {
    limit: searchParams.get("limit"),
    offset: searchParams.get("offset"),
  };
};

const mapToPokemonListItem = (pokemon: PokemonDetail): PokemonListItem => ({
  id: pokemon.id,
  name: pokemon.name,
  types: pokemon.types,
  sprites: {
    front_default: pokemon.sprites.front_default,
    other: {
      "official-artwork": {
        front_default:
          pokemon.sprites.other?.["official-artwork"].front_default ?? "",
      },
    },
  },
});

export default {
  fetchPokemonByName,
  getPaginatedPokemon,
};
