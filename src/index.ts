import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import pokemonRoutes from "./routes/pokemon.routes";
import { errorHandler } from "./middlewares/error-handler.middleware";

dotenv.config();
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(", ") || [
  "http://localhost:5173",
  "http://localhost:4173",
];
const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions: cors.CorsOptions = {
  origin: ALLOWED_ORIGINS,
  methods: ["GET"],
  optionsSuccessStatus: 200,
};

app.use(helmet());
app.use(cors(corsOptions));
app.use("/api/v1", pokemonRoutes);

app.use(errorHandler);

app.listen(PORT, function () {
  console.log(`Server running on port: ${PORT}`);
  console.log("API Version: v1");
});
