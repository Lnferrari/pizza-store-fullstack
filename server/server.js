import express from 'express'
import cors from 'cors'
import './db-connect.js'
import pizzasRouter from './routes/pizzasRouter.js'


const app = express()
const PORT = 5000


/* ----- MIDDLEWARES ----- */

app.use( express.json() )
app.use( cors() )

// Endpoints ----------------

app.use('/', (req, res) => {
  res.json('Welcome to the Pizza Store')
})

app.use('/pizzas', pizzasRouter)


// ------------------------------

app.listen(PORT, () => console.log(
  `API has started successfully on http://localhost:${PORT}`
))

// ERROR HANDLING
app.use((err, req, res, next) => {
  res.status(err.status || 400).send({
    error: {
      message: err.message,
      status: err.status
    }
  })
})