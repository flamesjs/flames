import * as ws from 'ws'
import { v4 } from 'uuid'

import { carve, deserialize, isEmpty, serializer } from '../utils'
import { Emitable, InfoMetadata, Message, MessageMetadata, MessageType, RoomState } from '../models'
import { Room } from './room'
import { FlamesServer } from '../flames-server'

export class Flame<T> implements Emitable<T | MessageMetadata> {
  public readonly id: string
  private rooms: Room[] = []

  constructor(private socket: ws,
              private server: FlamesServer) {
    this.emit(MessageType.connected)

    this.socket.on('message', (data: string) => this.onMessage(deserialize(data)))
    this.id = v4()
  }

  // TODO: Протипизировать это лучше, так что бы тип `payload` выводился сам в зависимости от `type`
  public emit(type: MessageType, payload?: T | MessageMetadata) {
    console.log(type, payload)
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

  private onMessage(message: Message<T>) {
    switch (message.type) {
      case MessageType.join:
        this.joinToRoom(message.meta.roomName)
        break
      case MessageType.leave:
        this.leaveFromRoom(message.meta.roomName)
        break
      default:
        break
    }
  }

  private joinToRoom(name: string) {
    const local = this.rooms.find(s => s.name === name)

    if (isEmpty(local)) {
      const global = this.server.rooms.find(s => s.name === name)

      if (isEmpty(global)) {
        const room = new Room(name)
        room.join(this)
        this.rooms.push(room)
        this.server.rooms.push(room)
        return
      }

      global.join(this)
      this.rooms.push(global)
      return
    }

    return
  }

  private leaveFromRoom(name: string) {
    const local = this.rooms.find(s => s.name === name)

    if (!isEmpty(local)) {
      local.leave(this)
      carve(local, this.rooms)

      if (local.state === RoomState.closed) {
        carve(local, this.server.rooms)
      }
    }
  }
}
