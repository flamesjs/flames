import * as ws from 'ws'

import { Emitable, FLAME_SERVER_CONFIG_DEFAULTS, FlameServerOptions, MessageType } from './models'
import { Flame, Room } from './essences'

export class FlamesServer implements Emitable<any> {
  private readonly config: FlameServerOptions
  private server: ws.Server

  private flames: Flame<any>[] = []
  public rooms: Room[] = []

  constructor(config?: Partial<FlameServerOptions>) {
    this.config = { ...FLAME_SERVER_CONFIG_DEFAULTS, ...config }

    this.server = new ws.Server(this.config)
    this.server.on('connection', (ws) => this.addClient(ws))
    this.server.on('listening', () => this.config.opening())
  }

  public emit(type: MessageType, payload?: any) {
    this.flames.forEach(flame => flame.emit(type, payload))
  }

  private addClient(socket: ws) {
    const flame = new Flame(socket, this)
    this.flames.push(flame)
  }
}
