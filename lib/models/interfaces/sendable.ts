import { MessageType } from './flame'

export interface Sendable<T> {
  send(type: MessageType, payload?: T): void
}
