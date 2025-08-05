import router from '@adonisjs/core/services/router'

const AssignmentsController = () => import('#controllers/assignments_controller')

router.get('/assignments', [AssignmentsController, 'index'])
router.get('/users/:id/assignments', [AssignmentsController, 'getUserAssignments'])
router.post('/assignments', [AssignmentsController, 'store'])
router.put('assignments/:id', [AssignmentsController, 'update'])
router.delete('assignments/:id', [AssignmentsController, 'destroy'])
