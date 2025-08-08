import { BaseJob } from '../types/job.js'
import Assignment from '#models/assignment'
import mail from '@adonisjs/mail/services/main'
import { DateTime } from 'luxon'

export default class ReminderEmailJob extends BaseJob {
  async run() {
    const now = DateTime.local().startOf('day')
    const assignments = await Assignment.query()
      .where('appointedDate', now.toSQLDate())
      .preload('user')
    for (const assignment of assignments) {
      const user = assignment.user
      await mail.send((message) => {
        message
          .to(user.email)
          .from('info@example.org')
          .subject(`Reminder: ${assignment.title}`)
          .html(`<p>You have a task "${assignment.title}" appointed for today.</p>`)
      })
    }
  }
}
