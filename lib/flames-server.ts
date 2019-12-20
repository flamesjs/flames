import * as ws from 'ws'

import { FLAMES_SERVER_CONFIG_DEFAULTS, FlamesServerEvents, FlameSServerOptions } from './models'
import { FlamesEventEmitter } from './utils'
import { Namespace } from './essences'

export class FlamesServer extends FlamesEventEmitter<FlamesServerEvents> {
  private readonly config: FlameSServerOptions
  private server: ws.Server
  private defaultNamespace = new Namespace('/', this)

  constructor(config?: Partial<FlameSServerOptions>) {
    super()
    this.config = { ...FLAMES_SERVER_CONFIG_DEFAULTS, ...config }

    this.server = new ws.Server(this.config)
    this.server.on('connection', (ws) => this.emit(FlamesServerEvents.connection, ws))
    this.on<ws>(FlamesServerEvents.connection, (ws) => this.onConnection(ws))
  }

  private onConnection(ws: ws) {
    this.defaultNamespace.addFlame(ws)
  }
}
