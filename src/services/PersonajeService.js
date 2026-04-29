const AppError     = require('../utils/AppError')
const StorageService = require('./StorageService')
const { generarNombre, generarEspecie, generarCategoria, ESPECIES, CATEGORIAS } = require('../utils/nombresAleatorios')
const Guerrero     = require('../classes/Guerrero')
const Explorador   = require('../classes/Explorador')
const Mago         = require('../classes/Mago')

const CLASES = { guerrero: Guerrero, explorador: Explorador, mago: Mago }

class PersonajeService {
  constructor() {
   
    this._personajes = StorageService.leerPersonajes()
    this._nextId     = this._personajes.reduce((max, p) => Math.max(max, p.id), 0) + 1
  }

  _crearInstancia(ficha) {
    const Clase = CLASES[ficha.categoria] || Guerrero
    return new Clase(ficha)
  }

  _validarEspecieCategoria(especie, categoria) {
    if (!ESPECIES.includes(especie)) {
      throw new AppError(`Especie "${especie}" no válida. Opciones: ${ESPECIES.join(', ')}`, 400)
    }
    if (!CATEGORIAS.includes(categoria)) {
      throw new AppError(`Categoría "${categoria}" no válida. Opciones: ${CATEGORIAS.join(', ')}`, 400)
    }
  }

  obtenerTodos(filtros = {}) {
    let resultado = [...this._personajes]
    if (filtros.especie)   resultado = resultado.filter(p => p.especie   === filtros.especie)
    if (filtros.categoria) resultado = resultado.filter(p => p.categoria === filtros.categoria)
    return resultado
  }

  obtenerPorId(id) {
    const personaje = this._personajes.find(p => p.id === id)
    if (!personaje) throw new AppError('Personaje no encontrado', 404)
    return personaje
  }

  crearManual({ nombre, especie, categoria }) {
    this._validarEspecieCategoria(especie, categoria)
    const instancia = this._crearInstancia({ id: this._nextId++, nombre, especie, categoria })
    const ficha     = instancia.ficha
    this._personajes.push(ficha)
    StorageService.appendPersonaje(ficha)
    return ficha
  }

  crearAleatorio() {
    const especie   = generarEspecie()
    const categoria = generarCategoria()
    const nombre    = generarNombre(especie)
    return this.crearManual({ nombre, especie, categoria })
  }

  actualizarNombre(id, nuevoNombre) {
    const index = this._personajes.findIndex(p => p.id === id)
    if (index === -1) throw new AppError('Personaje no encontrado', 404)
    this._personajes[index].nombre = nuevoNombre
    StorageService.guardarPersonajes(this._personajes)
    return this._personajes[index]
  }

  eliminar(id) {
    const index = this._personajes.findIndex(p => p.id === id)
    if (index === -1) throw new AppError('Personaje no encontrado', 404)
    const [eliminado] = this._personajes.splice(index, 1)
    StorageService.guardarPersonajes(this._personajes)
    return eliminado
  }

  registrarResultado(idGanador, idPerdedor) {
    const g = this._personajes.find(p => p.id === idGanador)
    const p = this._personajes.find(p => p.id === idPerdedor)
    if (g) g.victorias++
    if (p) p.derrotas++
    StorageService.guardarPersonajes(this._personajes)
  }
}


module.exports = new PersonajeService()