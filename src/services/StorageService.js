const fs   = require('fs')
const path = require('path')


const RUTA = path.join(__dirname, '../../data/personajes.txt')
const RUTA_COMBATES = path.join(__dirname, '../../data/combates.txt');

const StorageService = {
  leerPersonajes() {
    if (!fs.existsSync(RUTA)) return []

    const contenido = fs.readFileSync(RUTA, 'utf-8').trim()
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
    fs.writeFileSync(RUTA, contenido + '\n', 'utf-8')
  },

 
  appendPersonaje(personaje) {
    fs.appendFileSync(RUTA, JSON.stringify(personaje) + '\n', 'utf-8')
  },
leerCombates() {

    if (!fs.existsSync(RUTA_COMBATES)) return [];

    const contenido = fs.readFileSync(RUTA_COMBATES, 'utf-8').trim();
    

    if (!contenido) return [];

  
    return contenido
      .split('\n')
      .filter(linea => linea.trim() !== '') 
      .map(linea => JSON.parse(linea));    
  }

}




module.exports = StorageService