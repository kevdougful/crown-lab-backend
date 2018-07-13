import { ApplicationConfig } from '@loopback/core'
import { RestApplication, RestServer, RestBindings } from '@loopback/rest'
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

/**
 * Main type for Application
 */
export class CrownLabApiApplication extends BootMixin(
  RepositoryMixin(RestApplication)
) {
  /**
   *
   * @param options optional global config object for application
   */
  constructor(options?: ApplicationConfig) {
    super(options)

    // Set up the custom sequence
    this.sequence(MySequence)

    this.projectRoot = __dirname

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

  /**
   * This will allow you to test your application without needing to
   * use a "real" datasource! This turd will need to be cleaned up at some
   * point.
   */
  setupDatasources() {
    const datasource =
      this.options && this.options.datasource
        ? new juggler.DataSource(this.options.datasource)
        : MongoDataSource
    this.dataSource(datasource)
  }

  /**
   * Starts up the application and binds servers to ports
   */
  async start() {
    const server = await this.getServer(RestServer)
    server.bind('rest.port').to(process.env.PORT || 3000)
    await super.start()

    const port = await server.get(RestBindings.PORT)
    console.log(`Server is running at http://127.0.0.1:${port}`)
    console.log(`Try http://127.0.0.1:${port}/ping`)
  }
}
