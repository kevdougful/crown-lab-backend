import { DefaultCrudRepository, juggler } from '@loopback/repository'
import { Publication } from '../models'
import { inject } from '@loopback/core'

/**
 * Binds REST controllers operations to datasource-specific calls
 */
export class PublicationRepository extends DefaultCrudRepository<
  Publication,
  typeof Publication.prototype.id
> {
  /**
   *
   * @param datasource datasource object provided by *.datasource.ts
   */
  constructor(
    @inject('datasources.mongo') protected datasource: juggler.DataSource
  ) {
    super(Publication, datasource)
  }
}
