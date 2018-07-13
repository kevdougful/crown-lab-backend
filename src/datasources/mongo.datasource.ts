import { inject } from '@loopback/core'
import { juggler, DataSource, AnyObject } from '@loopback/repository'
const config = {
  name: 'mongo',
  connector: 'mongodb',
  url: process.env.MONGODB_URI
}

export class MongoDataSource extends juggler.DataSource {
  static dataSourceName = 'mongo'

  constructor(
    @inject('datasources.config.mongo', { optional: true })
    dsConfig: AnyObject = config
  ) {
    super(dsConfig)
  }
}
