const fs   = require('fs')
const path = require('path')

// Rutas absolutas a los ficheros de datos
const RUTA_PERSONAJES = path.join(__dirname, '../../data/personajes.txt')
const RUTA_COMBATES   = path.join(__dirname, '../../data/combates.txt')

/**
 * Formato NDJSON: cada línea es un objeto JSON independiente.
 * Ventaja: podemos hacer append sin reescribir todo el fichero.
 */
const StorageService = {
  // ─── Personajes ───────────────────────────────────────────────────────────

  leerPersonajes() {
    if (!fs.existsSync(RUTA_PERSONAJES)) return []

    const contenido = fs.readFileSync(RUTA_PERSONAJES, 'utf-8').trim()
    if (!contenido) return []

    return contenido
      .split('\n')
      .filter(linea => linea.trim())
      .map(linea => JSON.parse(linea))
  },

  guardarPersonajes(personajes) {
    const contenido = personajes
      .map(p => JSON.stringify(p))
      .join('\n')
    fs.writeFileSync(RUTA_PERSONAJES, contenido + '\n', 'utf-8')
  },

  appendPersonaje(personaje) {
    fs.appendFileSync(RUTA_PERSONAJES, JSON.stringify(personaje) + '\n', 'utf-8')
  },

  // ─── Combates ─────────────────────────────────────────────────────────────

  leerCombates() {
    if (!fs.existsSync(RUTA_COMBATES)) return []

    const contenido = fs.readFileSync(RUTA_COMBATES, 'utf-8').trim()
    if (!contenido) return []

    return contenido
      .split('\n')
      .filter(linea => linea.trim())
      .map(linea => JSON.parse(linea))
  },

  appendCombate(combate) {
    // Aseguramos que el fichero existe (touch equivalente)
    if (!fs.existsSync(RUTA_COMBATES)) {
      fs.writeFileSync(RUTA_COMBATES, '', 'utf-8')
    }
    fs.appendFileSync(RUTA_COMBATES, JSON.stringify(combate) + '\n', 'utf-8')
  }
}

module.exports = StorageService