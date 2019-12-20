import * as ws from 'ws'

export interface FlameSServerOptions extends ws.ServerOptions {
}
export const FLAMES_SERVER_CONFIG_DEFAULTS: FlameSServerOptions = {
  port: 8000
}

export enum FlamesServerEvents {
  connection = 'connection'
}
