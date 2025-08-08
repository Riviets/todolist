import type { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'
import User from '#models/user'
import jwt from 'jsonwebtoken'
import env from '#start/env'
import { resetPasswordEmailValidator, resetPasswordValidator } from '#validators/reset_password'

export default class PasswordResetController {
  public async sendResetPasswordEmail({ request, response }: HttpContext) {
    try {
      const { email } = await request.validateUsing(resetPasswordEmailValidator)
      const user = await User.findBy('email', email)
      if (!user) {
        return response.badRequest({
          message: 'Користувача з таким email не знайдено',
        })
      }
      const token = jwt.sign({ userId: user.id }, env.get('JWT_SECRET'), {
        expiresIn: '30min',
      })
      const resetLink = `http://localhost:5173/reset-password?token=${token}`

      await mail.send((message) => {
        message
          .to(email)
          .from('no-reply@demomailtrap.co', 'Todolist App')
          .subject('Resetting the password for Todolist app').html(`
          <p style="font-size: 32px;">Click here to reset the password:</p>
          <a 
            href="${resetLink}" 
            style="font-size: 18px; background-color: #364fbf; color: #ffffff; padding: 10px 15px; text-decoration: none; border-radius: 5px; margin-bottom: 5px"
          >
            Reset
          </a>
          <p style="font-size: 14px;">
            <span style="color: #ff0026;">Warning</span>: the link will expire in 30 minutes
          </p>
        `)
      })

      return response.ok({
        message: 'The email was sent',
      })
    } catch (error) {
      return response.status(500).send({
        message: 'Interval server error',
      })
    }
  }

  public async resetPassword({ request, response }: HttpContext) {
    try {
      const { newPassword, token } = await request.validateUsing(resetPasswordValidator)
      const decoded = jwt.verify(token, env.get('JWT_SECRET')) as { userId: number }
      const userId = decoded.userId
      const user = await User.find(userId)

      if (!user) {
        return response.badRequest({
          message: 'User not found',
        })
      }

      user.password = newPassword
      await user.save()

      return response.ok({
        message: 'The password has been updated',
      })
    } catch (error) {
      console.log(error)
      return response.internalServerError({
        message: 'Internal server error',
      })
    }
  }
}
