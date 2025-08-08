import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator, loginUserValidator } from '#validators/user'
import User from '#models/user'
import auth from '@adonisjs/auth/services/main'
import { messages } from '@vinejs/vine/defaults'

export default class AuthController {
  public async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createUserValidator)
      const existingUser = await User.query().where('email', payload.email).first()
      if (existingUser) {
        return response.conflict({ message: 'User is already signed up' })
      }
      const user = await User.create({
        username: payload.username,
        email: payload.email,
        password: payload.password,
      })
      return response.created(user)
    } catch (error) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.badRequest({ errors: error.messages })
      }
      return response.status(500).send({ message: 'Internal server error' })
    }
  }
  public async login({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(loginUserValidator)
      const user = await User.verifyCredentials(payload.email, payload.password)
      await auth.use('web').login(user)
      return response.ok(user)
    } catch (error) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.badRequest({ errors: error.messages })
      }
      return response.status(500).send({ message: 'Login error' })
    }
  }
  public async logout({ response, auth }: HttpContext) {
    try {
      await auth.use('web').logout()
      return response.ok({ message: 'User has been logged out' })
    } catch {
      return response.status(500).send({ message: 'Internal server error' })
    }
  }
  public async me({ response, auth }: HttpContext) {
    try {
      await auth.use('web').check()
      if (auth.use('web').isAuthenticated) {
        const user = auth.use('web').user
        return response.ok(user)
      }
      return response.unauthorized({ message: 'User is not logged in' })
    } catch {
      return response.unauthorized({ message: 'User is not logged in' })
    }
  }
}
