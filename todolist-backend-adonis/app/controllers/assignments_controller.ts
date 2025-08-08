import type { HttpContext } from '@adonisjs/core/http'
import Assignment from '#models/assignment'
import User from '#models/user'
import { createAssignmentValidator, updateAssignmentValidator } from '#validators/assignment'
import { DateTime } from 'luxon'

export default class AssignmentsController {
  public async index({ response }: HttpContext) {
    try {
      const assignments = await Assignment.all()
      return response.ok(assignments)
    } catch {
      return response.status(500).send({ message: 'Internal server error' })
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      const assignment = await Assignment.find(params.id)
      if (!assignment) {
        return response.notFound({ message: "Assignment with this id wasn't found" })
      }
      return response.ok(assignment)
    } catch {
      return response.status(500).send({ message: 'Internal server error' })
    }
  }

  public async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createAssignmentValidator)
      const user = await User.find(payload.userId)
      if (!user) {
        return response.notFound({ message: 'User not found' })
      }
      const assignment = await Assignment.create({
        userId: payload.userId,
        title: payload.title,
        appointedDate: DateTime.fromJSDate(payload.appointedDate),
      })
      return response.created(assignment)
    } catch (error) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.badRequest({ errors: error.messages })
      }
      return response.status(500).send({ message: 'Internal server error' })
    }
  }

  public async update({ request, response, params }: HttpContext) {
    try {
      const assignment = await Assignment.find(params.id)
      if (!assignment) {
        return response.notFound({ message: "Assignment wasn't found" })
      }
      const payload = await request.validateUsing(updateAssignmentValidator)
      assignment.merge({
        title: payload.title,
        appointedDate: DateTime.fromJSDate(payload.appointedDate),
      })
      await assignment.save()
      return response.ok(assignment)
    } catch (error) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.badRequest({ errors: error.messages })
      }
      return response.status(500).send({ message: 'Internal server error' })
    }
  }

  public async destroy({ params, response }: HttpContext) {
    try {
      const assignment = await Assignment.find(params.id)
      if (!assignment) {
        return response.notFound({ message: "Assignment wasn't found" })
      }
      await assignment.delete()
      return response.ok({ message: 'Assignment has been deleted' })
    } catch {
      return response.status(500).send({ message: 'Internal server error' })
    }
  }

  public async getUserAssignments({ params, response }: HttpContext) {
    try {
      const user = await User.find(params.id)
      if (!user) {
        return response.notFound({ message: 'User not found' })
      }
      const userAssignments = await Assignment.query().where('userId', params.id)
      return response.ok(userAssignments)
    } catch {
      return response.status(500).send({ message: 'Internal server error' })
    }
  }

  public async getUserAssignmentsForToday({ params, response }: HttpContext) {
    try {
      const user = await User.find(params.id)
      if (!user) {
        return response.notFound({ message: 'USer not found' })
      }
      const now = DateTime.local().startOf('day')
      const userAssignmentsForToday = await Assignment.query()
        .where('userId', user.id)
        .where('appointedDate', now.toSQLDate())
      return response.ok(userAssignmentsForToday)
    } catch {
      return response.status(500).send({ message: 'Internal server error' })
    }
  }
}
