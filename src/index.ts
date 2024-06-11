import express from 'express'
import cors from 'cors'
import pokemonRoutes from './routes/pokemon.routes'

const app = express()
const PORT = 3000 // <-- cambiar si lo desea

const corsOptions = {
  origin: 'http://localhost:5173', // <-- cambiar esto por el dominio desde el cual se realizan las solicitudes
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(pokemonRoutes)

app.listen(PORT, function () {
  console.log(`Listening at port: ${PORT}`)
})
