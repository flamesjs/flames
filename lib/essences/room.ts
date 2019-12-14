import { Flame } from './flame'
import { Emitable, MessageType, RoomState } from '../models'
import { isEmptyArray } from '../utils'

export class Room implements Emitable<any> {
  public state: RoomState = RoomState.open
  private readonly flames: Flame<any>[] = []

  constructor(public readonly name: string) {
    console.log(`Room with name ${this.name} has been open`)
  }

  public join(flame: Flame<any>) {
    if (!this.flames.includes(flame)) {
      this.flames.push(flame)
      console.log(`Flame with ${flame.id} id joined to ${this.name} room`)
      return
    }

    return flame.emit(MessageType.info, {
      info: {
        type: 'info',
        code: 0,
        message: `You already joined to room with name ${this.name}`
      }
    })
  }

  public leave(flame: Flame<any>) {
    const i = this.flames.indexOf(flame)
    this.flames.splice(i, 1)
    console.log(`Flame with ${flame.id} id leaved from ${this.name} room`)
    if (isEmptyArray(this.flames)) this.close()
  }

  public emit(type: MessageType, payload?: any) {
    this.flames.forEach(flame => flame.emit(type, payload))
  }

  public close() {
    console.log(`Room with name ${this.name} has been closed`)
    this.state = RoomState.closed
  }
}
