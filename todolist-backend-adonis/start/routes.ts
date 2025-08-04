import router from '@adonisjs/core/services/router'

const AssignmentsController = () => import('#controllers/assignments_controller')

router.get('/', [AssignmentsController, 'index'])
router.post('/', [AssignmentsController, 'store'])
router.put('/:id', [AssignmentsController, 'update'])
router.delete(':id', [AssignmentsController, 'destroy'])
