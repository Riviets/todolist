import vine from '@vinejs/vine'

export const taskValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1).maxLength(36),
    completed: vine.boolean(),
  })
)
