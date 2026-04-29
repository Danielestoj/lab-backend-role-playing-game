const { Router } = require('express')
const validar    = require('../middleware/validarCampos')
const ctrl       = require('../controllers/combateController')

const router = Router()

// IMPORTANTE: /historial debe ir ANTES de cualquier ruta con parámetro dinámico
// para que Express no lo interprete como un :id
router.get('/historial', ctrl.historial)

router.post('/', validar(['id1', 'id2']), ctrl.simular)

module.exports = router