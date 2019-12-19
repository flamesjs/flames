import * as ws from 'ws'

import { Flameable, FlameEvent, MessageType, Sendable } from '../interfaces'
import { Flame, Namespace } from '../../essences'
import { carve } from '../../utils'

export class FlamesController implements Sendable<any>, Flameable<any> {
  public readonly flames: Flame<any>[] = []

  constructor(private namespace: Namespace) {
  }

  public send(type: MessageType, payload?: any): void {
    this.flames.forEach(flame => flame.send(type, payload))
  }

  public addFlame(socket: ws): Flame<any> {
    const flame = new Flame(socket, this.namespace)
    this.eventsHandler(flame)
    this.join(flame)
    return flame
  }

  public removeFlame(flame: Flame<any>) {
    flame.close()
    this.leave(flame)
  }

  public join(flame: Flame<any>) {
    this.flames.push(flame)
  }

  public leave(flame: Flame<any>) {
    carve(flame, this.flames)
  }

  private eventsHandler(flame: Flame<any>) {
    flame.on<Flame<any>>(FlameEvent.close, (flame) => this.onClose(flame))
  }

  private onClose(flame: Flame<any>) {
    flame.removeAllListeners(FlameEvent.close)

    carve(flame, this.flames)
  }
}
