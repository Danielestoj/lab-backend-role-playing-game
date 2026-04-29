require('dotenv').config()
const express      = require('express')
const logger       = require('./src/middleware/logger')
const errorHandler = require('./src/middleware/errorHandler')

const app  = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(logger)

app.use('/api/personajes', require('./src/routes/personajes'))
app.use('/api/combates',   require('./src/routes/combates'))

// 404 para rutas no definidas
app.use((req, res) => {
  res.status(404).json({ error: `Ruta ${req.method} ${req.url} no encontrada` })
})

// Error handler SIEMPRE al final (4 parámetros)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`⚔️  RPG Backend en http://localhost:${PORT}`)
})