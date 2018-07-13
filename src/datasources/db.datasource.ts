import { inject } from '@loopback/core'
import { juggler, DataSource, AnyObject } from '@loopback/repository'
const config = {
  name: 'db',
  connector: 'memory',
  localStorage: '',
  file: './data/db.json'
}

export class DbDataSource extends juggler.DataSource {
  static dataSourceName = 'db'

  constructor(
    @inject('datasources.config.db', { optional: true })
    dsConfig: AnyObject = config
  ) {
    super(dsConfig)
  }
}
