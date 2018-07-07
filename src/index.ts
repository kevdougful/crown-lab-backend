import {CrownLabApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {CrownLabApplication};

export async function main(options?: ApplicationConfig) {
  const app = new CrownLabApplication(options);
  await app.boot();
  await app.start();
  return app;
}
