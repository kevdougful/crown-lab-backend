import { inject } from '@loopback/core'
import {
  FindRoute,
  InvokeMethod,
  ParseParams,
  Reject,
  RequestContext,
  RestBindings,
  Send,
  SequenceHandler
} from '@loopback/rest'

const SequenceActions = RestBindings.SequenceActions

/**
 * Handles ordering of operations when handling a request
 */
export class MySequence implements SequenceHandler {
  /**
   *
   * @param findRoute Finds the proper controller operation
   * @param parseParams Parses any query or form parameters
   * @param invoke Invokes any "middleware" methods
   * @param send Sends a successful response
   * @param reject Sends an error message if occurs
   */
  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject
  ) {}

  /**
   * Handles a request using the defined sequence of events
   *
   * @param context object with application/server context in which request was received.
   */
  async handle(context: RequestContext) {
    try {
      const { request, response } = context
      const route = this.findRoute(request)
      const args = await this.parseParams(request, route)
      const result = await this.invoke(route, args)
      this.send(response, result)
    } catch (err) {
      this.reject(context, err)
    }
  }
}
