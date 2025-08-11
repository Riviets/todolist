import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AssignmentsController = () => import('#controllers/assignments_controller')
const TasksController = () => import('#controllers/tasks_controller')
const AuthController = () => import('#controllers/auth_controller')
const ResetPasswordController = () => import('#controllers/reset_password_controller')

//Assignments
router
  .get('/assignments', [AssignmentsController, 'index'])
  .use(middleware.auth({ guards: ['web'] }))
router
  .get('assignments/:id', [AssignmentsController, 'show'])
  .use(middleware.auth({ guards: ['web'] }))
router
  .get('/users/:id/assignments', [AssignmentsController, 'getUserAssignments'])
  .use(middleware.auth({ guards: ['web'] }))
router
  .get('users/:id/assignments/today', [AssignmentsController, 'getUserAssignmentsForToday'])
  .use(middleware.auth({ guards: ['web'] }))
router
  .post('/assignments', [AssignmentsController, 'store'])
  .use(middleware.auth({ guards: ['web'] }))
router
  .put('assignments/:id', [AssignmentsController, 'update'])
  .use(middleware.auth({ guards: ['web'] }))
router
  .delete('assignments/:id', [AssignmentsController, 'destroy'])
  .use(middleware.auth({ guards: ['web'] }))

//Tasks
router.get('/tasks', [TasksController, 'index']).use(middleware.auth({ guards: ['web'] }))
router.post('/tasks', [TasksController, 'store']).use(middleware.auth({ guards: ['web'] }))
router.put('/tasks/:id', [TasksController, 'update']).use(middleware.auth({ guards: ['web'] }))
router.delete('/tasks/:id', [TasksController, 'destroy']).use(middleware.auth({ guards: ['web'] }))

//Auth
router.post('/users', [AuthController, 'store'])
router.post('/users/login', [AuthController, 'login'])
router.post('/users/logout', [AuthController, 'logout'])
router.get('/users/me', [AuthController, 'me'])

//reset password
router.post('/users/forgot-password', [ResetPasswordController, 'sendResetPasswordEmail'])
router.post('/users/reset-password', [ResetPasswordController, 'resetPassword'])
