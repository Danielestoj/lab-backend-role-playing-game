const Combate  = require('../classes/Combate')
const service  = require('../services/PersonajeService')
const AppError = require('../utils/AppError')

const simular = (req, res, next) => {
  try {
    const { id1, id2 } = req.body
    if (id1 === id2) throw new AppError('Un personaje no puede combatir consigo mismo', 400)

    const p1 = service.obtenerPorId(Number(id1))
    const p2 = service.obtenerPorId(Number(id2))

    const resultado = Combate.simular(p1, p2)

    // Actualizar victorias/derrotas
    const idGanador  = resultado.ganador  === p1.nombre ? p1.id : p2.id
    const idPerdedor = resultado.perdedor === p1.nombre ? p1.id : p2.id
    service.registrarResultado(idGanador, idPerdedor)

    res.json(resultado)
  } catch (err) {
    next(err)
  }
}

module.exports = { simular }