import * as ws from 'ws'

import { FlamesEventEmitter } from '../utils'
import { Flame } from './flame'
import { FlamesController, MessageType, RoomsController } from '../models'
import { FlamesServer } from '../flames-server'
import { Room } from './room'

export class Namespace extends FlamesEventEmitter<any> {
  private roomController = new RoomsController(this)
  private flamesController = new FlamesController(this)

  constructor(public readonly path: string,
              private server: FlamesServer) {
    super()
  }

  public send(type: MessageType, payload?: any) {
    this.flamesController.send(type, payload)
  }

  public addFlame(socket: ws) {
    this.flamesController.addFlame(socket)
  }

  public removeFlame(flame: Flame<any>) {
    this.flamesController.removeFlame(flame)
  }

  public addRoom(name: string | Room) {
    return this.roomController.addRoom(name)
  }

  public getRoom(name: string) {
    return this.roomController.getRoom(name)
  }

  public removeRoom(name: string) {
    this.roomController.removeRoom(name)
  }
}
