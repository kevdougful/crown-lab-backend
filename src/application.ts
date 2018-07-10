import { ApplicationConfig } from '@loopback/core'
import { RestApplication, RestServer, RestBindings } from '@loopback/rest'
import {
  AuthenticationComponent,
  AuthenticationBindings
} from '@loopback/authentication'
import { AuthStrategyProvider } from './providers/auth-strategy.provider'
import { MySequence } from './sequence'
import { MongoDataSource } from './datasources/mongo.datasource'

/* tslint:disable:no-unused-variable */
// Binding and Booter imports are required to infer types for BootMixin!
import { BootMixin, Booter, Binding } from '@loopback/boot'

// juggler imports are required to infer types for RepositoryMixin!
import {
  Class,
  Repository,
  RepositoryMixin,
  juggler
} from '@loopback/repository'
/* tslint:enable:no-unused-variable */

export class CrownLabApiApplication extends BootMixin(
  RepositoryMixin(RestApplication)
) {
  constructor(options?: ApplicationConfig) {
    super(options)

    // Set up the custom sequence
    this.sequence(MySequence)

    this.projectRoot = __dirname

    this.component(AuthenticationComponent)
    this.bind(AuthenticationBindings.STRATEGY).toProvider(AuthStrategyProvider)
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true
      }
    }

    this.setupDatasources()
  }

  setupDatasources() {
    // This will allow you to test your application without needing to
    // use a "real" datasource!
    const datasource =
      this.options && this.options.datasource
        ? new juggler.DataSource(this.options.datasource)
        : MongoDataSource
    this.dataSource(datasource)
  }

  async start() {
    const server = await this.getServer(RestServer)
    server.bind('rest.port').to(process.env.PORT || 3000)
    await super.start()

    const port = await server.get(RestBindings.PORT)
    console.log(`Server is running at http://127.0.0.1:${port}`)
    console.log(`Try http://127.0.0.1:${port}/ping`)
  }
}
