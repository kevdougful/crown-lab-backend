import { DefaultCrudRepository, juggler } from '@loopback/repository'
import { User } from '../models'
import { inject } from '@loopback/core'

/**
 * Binds REST controllers operations to datasource-specific calls
 */
export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
> {
  /**
   *
   * @param datasource datasource object provided by *.datasource.ts
   */
  constructor(
    @inject('datasources.mongo') protected datasource: juggler.DataSource
  ) {
    super(User, datasource)
  }
}
