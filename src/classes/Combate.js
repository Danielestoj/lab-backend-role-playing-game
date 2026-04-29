class Combate {
  /**
   * Simula un combate por turnos entre dos personajes.
   * Recibe objetos planos (fichas), no instancias de clase.
   * Devuelve: { ganador, perdedor, rondas, log }
   */
  static simular(fichaA, fichaB) {
    // Copias de vida para no mutar los originales
    let vidaA = fichaA.stats.vida
    let vidaB = fichaB.stats.vida
    const log = []
    let ronda  = 0

    // Determinar orden: mayor iniciativa ataca primero
    const [primero, segundo] =
      fichaA.stats.iniciativa >= fichaB.stats.iniciativa
        ? [fichaA, fichaB]
        : [fichaB, fichaA]

    let vidaPrimero  = primero  === fichaA ? vidaA : vidaB
    let vidaSegundo  = primero  === fichaA ? vidaB : vidaA

    log.push(`⚔️  ${primero.nombre} (iniciativa ${primero.stats.iniciativa}) ataca primero`)

    while (vidaPrimero > 0 && vidaSegundo > 0) {
      ronda++

      // Turno del primero
      const danioPrimero = Math.max(1, primero.stats.ataque - segundo.stats.defensa)
      vidaSegundo -= danioPrimero
      log.push(`Ronda ${ronda}a: ${primero.nombre} → ${segundo.nombre} [-${danioPrimero} vida] (${Math.max(0, vidaSegundo)} restante)`)

      if (vidaSegundo <= 0) break

      // Turno del segundo
      const danioSegundo = Math.max(1, segundo.stats.ataque - primero.stats.defensa)
      vidaPrimero -= danioSegundo
      log.push(`Ronda ${ronda}b: ${segundo.nombre} → ${primero.nombre} [-${danioSegundo} vida] (${Math.max(0, vidaPrimero)} restante)`)
    }

    const ganador  = vidaPrimero > 0 ? primero : segundo
    const perdedor = ganador === primero ? segundo : primero

    log.push(`🏆 Ganador: ${ganador.nombre} en ${ronda} ronda(s)`)

    return { ganador: ganador.nombre, perdedor: perdedor.nombre, rondas: ronda, log }
  }
}

module.exports = Combate