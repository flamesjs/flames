import { Roomable, RoomEvent } from '../interfaces'
import { Namespace, Room } from '../../essences'
import { carve, isEmpty } from '../../utils'

export class RoomsController implements Roomable {
  public rooms: Room[] = []

  constructor(private namespace: Namespace) {
  }

  public addRoom(nameOrRoom: string | Room) {
    if (nameOrRoom instanceof Room) {
      if (!isEmpty(this.getRoom(nameOrRoom.name))) return

      this.rooms.push(nameOrRoom)
      this.eventsHandler(nameOrRoom)
      return nameOrRoom
    }

    if (!isEmpty(this.getRoom(nameOrRoom))) return

    const room = new Room(nameOrRoom, this.namespace)
    this.rooms.push(room)
    this.eventsHandler(room)
    return room
  }

  public getRoom(name: string) {
    return this.rooms.find(r => r.name === name)
  }

  public removeRoom(name: string) {
    const room = this.getRoom(name)
    room.close()
  }

  private eventsHandler(room: Room) {
    room.on<Room>(RoomEvent.close, (room) => this.onClose(room))
  }

  private onClose(room: Room) {
    room.removeAllListeners(RoomEvent.close)

    carve(room, this.rooms)
  }
}
