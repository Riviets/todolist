import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    username: vine.string().minLength(3).maxLength(16),
    email: vine.string().email(),
    password: vine
      .string()
      .minLength(6)
      .maxLength(16)
      .regex(/^(?=.*[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ])(?=.*\d).+$/),
  })
)

export const loginUserValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine
      .string()
      .minLength(6)
      .maxLength(16)
      .regex(/^(?=.*[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ])(?=.*\d).+$/),
  })
)
