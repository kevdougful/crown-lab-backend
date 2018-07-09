import { DefaultCrudRepository, juggler } from '@loopback/repository'
import { Publication } from '../models'
import { inject } from '@loopback/core'

export class PublicationRepository extends DefaultCrudRepository<
  Publication,
  typeof Publication.prototype.id
> {
  constructor(
    @inject('datasources.mongo') protected datasource: juggler.DataSource
  ) {
    super(Publication, datasource)
  }
}
