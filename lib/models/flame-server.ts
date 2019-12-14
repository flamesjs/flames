import * as ws from 'ws'

export interface FlameServerOptions extends ws.ServerOptions {
  opening?: () => void
}
export const FLAME_SERVER_CONFIG_DEFAULTS: FlameServerOptions = {
  opening: () => {}
}
