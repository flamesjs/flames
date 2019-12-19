import { Flame } from './flame'
import { Namespace } from './namespace'
import { FlamesController, MessageType, RoomEvent, Sendable } from '../models'
import { FlamesEventEmitter, isEmptyArray } from '../utils'

export class Room extends FlamesEventEmitter<RoomEvent> implements Sendable<any> {
  private flamesController = new FlamesController(this.namespace)

  constructor(public readonly name: string,
              private namespace: Namespace) {
    super()
  }

  public join(flame: Flame<any>) {
    this.emit(RoomEvent.joinFlame, flame)
    this.flamesController.join(flame)
  }

  public leave(flame: Flame<any>) {
    this.flamesController.leave(flame)

    if (isEmptyArray(this.flamesController.flames)) {
      this.close()
    }
  }

  public send(type: MessageType, payload?: any) {
    this.flamesController.send(type, payload)
  }

  public close() {
    this.emit(RoomEvent.close, this)
  }
}
