import { DefaultCrudRepository, juggler } from '@loopback/repository'
import { Person } from '../models'
import { inject } from '@loopback/core'

export class PersonRepository extends DefaultCrudRepository<
  Person,
  typeof Person.prototype.id
> {
  constructor(
    @inject('datasources.mongo') protected datasource: juggler.DataSource
  ) {
    super(Person, datasource)
  }
}
