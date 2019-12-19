import { Room } from '../../essences'

export interface Roomable {
  rooms: Room[]
  getRoom(name: string): Room
  addRoom(name: string): Room
  removeRoom(name: string)
}
