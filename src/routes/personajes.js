const { Router }   = require('express')
const validar      = require('../middleware/validarCampos')
const ctrl         = require('../controllers/personajeController')
const validarEnum = require('../middleware/validarEnum')
const { BONUS_ESPECIES, BONUS_CATEGORIAS } = require('../utils/nombresAleatorios')

const router = Router()

router.get('/',              ctrl.listar)
router.get('/:id',           ctrl.obtenerUno)
router.post('/manual',       validar(['nombre', 'especie', 'categoria']),
                             validarEnum('especie', BONUS_ESPECIES),
                             validarEnum('categoria', BONUS_CATEGORIAS),
                             ctrl.crearManual)
router.post('/aleatorio',    ctrl.crearAleatorio)
router.put('/:id',           validar(['nombre']), ctrl.actualizar)
router.delete('/:id',        ctrl.eliminar)

module.exports = router