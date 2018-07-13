import { property, model, Entity } from '@loopback/repository'
import { UserProfile } from '@loopback/authentication'

@model()
export class User extends Entity implements UserProfile {
  @property({
    type: 'string',
    id: true,
    description: 'numerical user ID'
  })
  id: string

  @property({
    type: 'string',
    description: 'Full name of user'
  })
  name?: string

  @property({
    type: 'string',
    description: 'email address to contact user'
  })
  email?: string
}
