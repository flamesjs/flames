import * as ws from 'ws'

import { Flame } from '../../essences'

export interface Flameable<T> {
  readonly flames: Flame<T>[]
  addFlame(socket: ws): Flame<T>
  removeFlame(flame: Flame<T>)
}
