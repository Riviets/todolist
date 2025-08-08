import router from '@adonisjs/core/services/router'

const AssignmentsController = () => import('#controllers/assignments_controller')
const TasksController = () => import('#controllers/tasks_controller')
const AuthController = () => import('#controllers/auth_controller')
const ResetPasswordController = () => import('#controllers/reset_password_controller')

//Assignments
router.get('/assignments', [AssignmentsController, 'index'])
router.get('assignments/:id', [AssignmentsController, 'show'])
router.get('/users/:id/assignments', [AssignmentsController, 'getUserAssignments'])
router.get('users/:id/assignments/today', [AssignmentsController, 'getUserAssignmentsForToday'])
router.post('/assignments', [AssignmentsController, 'store'])
router.put('assignments/:id', [AssignmentsController, 'update'])
router.delete('assignments/:id', [AssignmentsController, 'destroy'])

//Tasks
router.get('/tasks', [TasksController, 'index'])
router.post('/tasks', [TasksController, 'store'])
router.put('/tasks/:id', [TasksController, 'update'])
router.delete('/tasks/:id', [TasksController, 'destroy'])

//Auth
router.post('/users', [AuthController, 'store'])
router.post('/users/login', [AuthController, 'login'])
router.post('/users/logout', [AuthController, 'logout'])
router.get('/users/me', [AuthController, 'me'])

//reset password
router.post('/users/forgot-password', [ResetPasswordController, 'sendResetPasswordEmail'])
router.post('/users/reset-password', [ResetPasswordController, 'resetPassword'])
