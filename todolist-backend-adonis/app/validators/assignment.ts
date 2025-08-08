import vine from '@vinejs/vine'

export const createAssignmentValidator = vine.compile(
  vine.object({
    userId: vine.number(),
    title: vine.string().maxLength(36).minLength(1).trim(),
    appointedDate: vine.date().after('today'),
  })
)

export const updateAssignmentValidator = vine.compile(
  vine.object({
    title: vine.string().maxLength(36).minLength(1).trim(),
    appointedDate: vine.date().after('today'),
  })
)
