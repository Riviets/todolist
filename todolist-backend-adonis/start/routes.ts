import router from '@adonisjs/core/services/router'

const AssignmentsController = () => import('#controllers/assignments_controller')

router.get('/assignments', [AssignmentsController, 'index'])
router.get('assignments/:id', [AssignmentsController, 'show'])
router.get('/users/:id/assignments', [AssignmentsController, 'getUserAssignments'])
router.get('users/:id/assignments/today', [AssignmentsController, 'getUserAssignmentsForToday'])
router.post('/assignments', [AssignmentsController, 'store'])
router.put('assignments/:id', [AssignmentsController, 'update'])
router.delete('assignments/:id', [AssignmentsController, 'destroy'])
