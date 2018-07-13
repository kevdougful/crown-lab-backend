import { inject } from '@loopback/core'
import { repository } from '@loopback/repository'
import { UserRepository } from '../repositories'
import { User } from '../models'
import {
  HttpErrors,
  post,
  get,
  put,
  patch,
  del,
  param,
  requestBody
} from '@loopback/rest'
import {
  AuthenticationBindings,
  UserProfile,
  authenticate
} from '@loopback/authentication'

/**
 * Provides routes for User CRUD operations
 */
export class UserController {
  constructor(
    @inject(AuthenticationBindings.CURRENT_USER, { optional: true })
    private user: UserProfile,
    @repository(UserRepository) protected repo: UserRepository
  ) {}

  /**
   * Echo back the currently authenticated user
   */
  @authenticate('BasicStrategy')
  @get('/whoami')
  whoAmI() {
    return this.user.id
  }

  @post('/users')
  async createUser(@requestBody() user: User): Promise<User> {
    return await this.repo.create(user)
  }
}
