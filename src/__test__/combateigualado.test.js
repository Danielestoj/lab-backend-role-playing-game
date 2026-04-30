//TEST PARA COMPROBAR QUE SI AMBOS PERSONAJES TIENEN LOS MISMOS STATS, GANA EL PRIMERO POR EL SISTEMA DE TURNOS


const request = require('supertest')
const app = require('../../app')

jest.mock('../services/PersonajeService', () => ({
  obtenerPorId: jest.fn(),
  registrarResultado: jest.fn()
}))

jest.mock('../services/StorageService', () => ({
  appendCombate: jest.fn()
}))

const service = require('../services/PersonajeService')

describe('Combate igualado → gana el primero', () => {

  test('si ambos tienen los mismos stats, gana el primero por turnos', async () => {

    const p1 = {
      id: 1,
      nombre: 'A',
      categoria: 'guerrero',
      stats: { vida: 100, ataque: 20, defensa: 10, iniciativa: 50 },
      habilidadEspecial: null
    }

    const p2 = {
      id: 2,
      nombre: 'B',
      categoria: 'guerrero',
      stats: { vida: 100, ataque: 20, defensa: 10, iniciativa: 50 },
      habilidadEspecial: null
    }

    service.obtenerPorId.mockImplementation(id => id === 1 ? p1 : p2)

    const res = await request(app)
      .post('/api/combates')
      .send({ id1: 1, id2: 2 })

    expect(res.statusCode).toBe(200)
    expect(res.body.ganador).toBe('A')
    expect(res.body.perdedor).toBe('B')
    expect(res.body.rondas).toBeGreaterThan(0)
  })
})
