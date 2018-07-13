import { CrownLabApiApplication } from './application'
import { ApplicationConfig } from '@loopback/core'

export { CrownLabApiApplication }

/**
 * Application entry point
 *
 * @param options optional global config object for application
 */
export async function main(options?: ApplicationConfig) {
  const app = new CrownLabApiApplication(options)
  await app.boot()
  await app.start()
  return app
}
