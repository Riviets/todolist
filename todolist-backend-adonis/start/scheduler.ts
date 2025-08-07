import SchedulerService from '#services/scheduler_service'
import ReminderEmailJob from '../app/jobs/reminder_email_job.js'

const scheduler = new SchedulerService()
scheduler.addJob({
  key: 'reminder-email-job',
  cronExpression: '0 8 * * *',
  job: new ReminderEmailJob(),
})
scheduler.scheduleAllJobs()
