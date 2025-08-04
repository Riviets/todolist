import type { HttpContext } from '@adonisjs/core/http'
import Assignment from '#models/assignment'

export default class AssignmentsController {
  public async index({ response }: HttpContext) {
    const assignments = await Assignment.all()
    return response.ok(assignments)
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['userId', 'title', 'appointedDate'])
    const assignment = await Assignment.create({
      userId: data.userId,
      title: data.title,
      appointedDate: data.appointedDate,
    })
    return response.created(assignment)
  }

  public async update({ request, response, params }: HttpContext) {
    const assignment = await Assignment.find(params.id)
    if (!assignment) {
      return response.notFound({ message: "Assignment wasn't found" })
    }
    const data = request.only(['title', 'appointedDate'])
    assignment.merge({
      title: data.title,
      appointedDate: data.appointedDate,
    })
    await assignment.save()
    return response.ok(assignment)
  }

  public async destroy({ params, response }: HttpContext) {
    const assignment = await Assignment.find(params.id)
    if (!assignment) {
      return response.notFound({ message: "Assignment wasn't found" })
    }
    await assignment.delete()
    return response.ok({ message: 'Assignment has been deleted' })
  }
}
