import * as ws from 'ws'

import { deserialize, FlamesEventEmitter, isEmpty, serializer } from '../utils'
import { FlameEvent, InfoMetadata, Message, MessageMetadata, MessageType, RoomsController, Sendable } from '../models'
import { Namespace } from './namespace'

export class Flame<T> extends FlamesEventEmitter<FlameEvent> implements Sendable<T | MessageMetadata> {
  private roomsController = new RoomsController(this.namespace)

  constructor(private socket: ws,
              private namespace: Namespace) {
    super()
    this.send(MessageType.connected)

    this.socket.on('message', (data: string) => this.onMessage(deserialize(data)))
    this.socket.on('close', () => this.onClose())
  }

  // TODO: Протипизировать это лучше, так что бы тип `payload` выводился сам в зависимости от `type`
  public send(type: MessageType, payload?: T | MessageMetadata) {
    switch (type) {
      case MessageType.message:
        this.socket.send(serializer({ type, payload }))
        break
      case MessageType.info:
        this.socket.send(serializer({ type, meta: (payload as InfoMetadata) }))
        break
      case MessageType.connected:
        this.socket.send(serializer({ type }))
        break
    }
  }

  public join(name: string) {
    const local = this.roomsController.getRoom(name)

    if (isEmpty(local)) {
      const global = this.namespace.getRoom(name)

      if (isEmpty(global)) {
        const room = this.roomsController.addRoom(name)
        room.join(this)
        this.roomsController.addRoom(room)
        this.namespace.addRoom(room)
        return
      }

      global.join(this)
      this.roomsController.addRoom(global)
      return
    }

    return
  }

  public leave(name: string) {
    const room = this.roomsController.getRoom(name)
    room.leave(this)
  }

  public close() {
  }

  private onMessage(message: Message<T>) {
    this.emit(FlameEvent.message, message)

    switch (message.type) {
      case MessageType.join: return this.join(message.meta.roomName)
      case MessageType.leave: return this.leave(message.meta.roomName)
      default: return
    }
  }

  private onClose() {
    this.emit(FlameEvent.close, this)
  }
}
