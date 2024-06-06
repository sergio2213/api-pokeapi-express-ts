import express from 'express'
import pokemonRoutes from './routes/pokemon.routes'

const app = express()
const PORT = 3000

app.use(pokemonRoutes)

app.listen(PORT, function () {
  console.log(`Listening at port: ${PORT}`)
})
