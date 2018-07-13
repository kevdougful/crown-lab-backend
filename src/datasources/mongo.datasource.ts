import { inject } from '@loopback/core'
import { juggler, DataSource, AnyObject } from '@loopback/repository'
const config = {
  name: 'mongo',
  connector: 'mongodb',
  url: process.env.MONGODB_URI
}

/**
 * Provides datasource configuration details
 */
export class MongoDataSource extends juggler.DataSource {
  static dataSourceName = 'mongo'

  /**
   *
   * @param dsConfig configuration object from loopback-connector package
   */
  constructor(
    @inject('datasources.config.mongo', { optional: true })
    dsConfig: AnyObject = config
  ) {
    super(dsConfig)
  }
}
