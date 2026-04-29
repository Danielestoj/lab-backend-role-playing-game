const { Router }   = require('express')
const validar      = require('../middleware/validarCampos')
const ctrl         = require('../controllers/personajeController')

const router = Router()

router.get('/',              ctrl.listar)
router.get('/:id',           ctrl.obtenerUno)
router.post('/manual',       validar(['nombre', 'especie', 'categoria']), ctrl.crearManual)
router.post('/aleatorio',    ctrl.crearAleatorio)
router.put('/:id',           validar(['nombre']), ctrl.actualizar)
router.delete('/:id',        ctrl.eliminar)

module.exports = router