import { Router } from "express";
import pokemonController from "../controllers/pokemon.controller";

const router = Router();

router.get("/pokemon", pokemonController.index);
router.get("/pokemon/:identifier", pokemonController.getOne);

export default router;
