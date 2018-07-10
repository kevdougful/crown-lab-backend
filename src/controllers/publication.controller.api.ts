export const def = {
  openapi: '3.0.0',
  info: {
    title: 'Crown Lab API',
    version: '1.0.0'
  },
  paths: {
    '/publications': {
      get: {
        'x-operation-name': 'publications',
        'x-controller-name': 'PublicationController',
        responses: {
          '200': {
            description: 'Get publications',
            content: {
              'application/json': {
                schema: { type: 'Array' }
              }
            }
          }
        }
      }
    }
  }
}
