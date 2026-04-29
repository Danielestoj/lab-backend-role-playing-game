const Combate        = require('../classes/Combate')
const service        = require('../services/PersonajeService')
const StorageService = require('../services/StorageService')
const AppError       = require('../utils/AppError')

const simular = (req, res, next) => {
  try {
    const { id1, id2 } = req.body
    if (id1 === id2) throw new AppError('Un personaje no puede combatir consigo mismo', 400)

    const p1 = service.obtenerPorId(Number(id1))
    const p2 = service.obtenerPorId(Number(id2))

    const resultado = Combate.simular(p1, p2)

    // Actualizar victorias/derrotas en memoria y en personajes.txt
    const idGanador  = resultado.ganador  === p1.nombre ? p1.id : p2.id
    const idPerdedor = resultado.perdedor === p1.nombre ? p1.id : p2.id
    service.registrarResultado(idGanador, idPerdedor)

    // ── Bonus: persistir combate en combates.txt ──────────────────────────
    const registro = {
      fecha:    new Date().toISOString(),
      ganador:  resultado.ganador,
      perdedor: resultado.perdedor,
      rondas:   resultado.rondas,
      log:      resultado.log
    }
    StorageService.appendCombate(registro)
    // ─────────────────────────────────────────────────────────────────────

    res.json(resultado)
  } catch (err) {
    next(err)
  }
}

// ── Bonus: GET /api/combates/historial ────────────────────────────────────
const historial = (req, res, next) => {
  try {
    const combates = StorageService.leerCombates()

    // Devolvemos solo los campos relevantes (sin el log completo de rondas)
    // para mantener la respuesta limpia. El log completo sigue guardado en disco.
    const resumen = combates.map(c => ({
      fecha:    c.fecha,
      ganador:  c.ganador,
      perdedor: c.perdedor,
      rondas:   c.rondas
    }))

    res.json({ total: resumen.length, combates: resumen })
  } catch (err) {
    next(err)
  }
}

module.exports = { simular, historial }