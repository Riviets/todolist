import vine from '@vinejs/vine'

export const resetPasswordEmailValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
  })
)

export const resetPasswordValidator = vine.compile(
  vine.object({
    token: vine.string().trim(),
    newPassword: vine.string().minLength(6),
  })
)
