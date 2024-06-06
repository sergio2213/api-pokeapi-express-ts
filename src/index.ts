import express from 'express'
import pokemonRoutes from './routes/pokemon.routes'

const app = express()
const PORT = 3000 // <-- cambiar si lo desea

app.use(pokemonRoutes)

app.listen(PORT, function () {
  console.log(`Listening at port: ${PORT}`)
})
