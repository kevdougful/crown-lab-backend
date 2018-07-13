import { Provider, inject, ValueOrPromise } from '@loopback/core'
import { Strategy } from 'passport'
import {
  AuthenticationBindings,
  AuthenticationMetadata,
  UserProfile
} from '@loopback/authentication'
import { BasicStrategy } from 'passport-http'
import { User } from '../models'

export class AuthStrategyProvider implements Provider<Strategy | undefined> {
  constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata
  ) {}

  value(): ValueOrPromise<Strategy | undefined> {
    if (!this.metadata) return undefined

    const name = this.metadata.strategy
    if (name === 'BasicStrategy') {
      return new BasicStrategy(this.verify)
    } else {
      return Promise.reject(`The strategy ${name} is not available`)
    }
  }

  verify(
    username: string,
    password: string,
    cb: (err: Error | null, user?: UserProfile | false) => void
  ) {
    // Find user by name and password
    // call cb(null, false) when user not found
    // call cb(null, user) when user is authenticated
    cb(null, new User({ name: 'kevin' }))
  }
}
