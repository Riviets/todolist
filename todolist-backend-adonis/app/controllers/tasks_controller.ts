import Task from '#models/task'
import type { HttpContext } from '@adonisjs/core/http'
import { taskValidator } from '#validators/task'

export default class TasksController {
  public async index({ response }: HttpContext) {
    try {
      const tasks = await Task.all()
      return response.ok(tasks)
    } catch {
      return response.status(500).send({ message: 'Internal server error' })
    }
  }
  public async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(taskValidator)
      const task = await Task.create({
        title: payload.title,
        completed: payload.completed,
      })
      return response.created(task)
    } catch (error) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.badRequest({ errors: error.messages })
      }
      return response.status(500).send({ message: 'Internal server error' })
    }
  }
  public async update({ params, request, response }: HttpContext) {
    try {
      const task = await Task.find(params.id)
      if (!task) {
        return response.notFound({ message: 'Task not found' })
      }
      const payload = await request.validateUsing(taskValidator)
      task.merge({
        title: payload.title,
        completed: payload.completed,
      })
      await task.save()
      return response.ok(task)
    } catch (error) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.badRequest({ errors: error.messages })
      }
      return response.status(500).send({ message: 'Internal server error' })
    }
  }
  public async destroy({ params, response }: HttpContext) {
    try {
      const task = await Task.find(params.id)
      if (!task) {
        return response.notFound({ message: 'Task not found' })
      }
      await task.delete()
      return response.ok({ message: 'Task has been deleted' })
    } catch {
      return response.status(500).send({ message: 'Internal server error' })
    }
  }
}
