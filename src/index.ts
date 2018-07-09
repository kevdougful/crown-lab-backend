import { CrownLabApiApplication } from './application'
import { ApplicationConfig } from '@loopback/core'

export { CrownLabApiApplication }

export async function main(options?: ApplicationConfig) {
  const app = new CrownLabApiApplication(options)
  await app.boot()
  await app.start()
  return app
}
