import { inject } from '@loopback/core'
import { juggler, DataSource, AnyObject } from '@loopback/repository'
const config = {
  name: 'db',
  connector: 'memory',
  localStorage: '',
  file: './data/db.json'
}

/**
 * Provides datasource configuration details
 */
export class DbDataSource extends juggler.DataSource {
  static dataSourceName = 'db'

  /**
   *
   * @param dsConfig configuration object from loopback-connector package
   */
  constructor(
    @inject('datasources.config.db', { optional: true })
    dsConfig: AnyObject = config
  ) {
    super(dsConfig)
  }
}
